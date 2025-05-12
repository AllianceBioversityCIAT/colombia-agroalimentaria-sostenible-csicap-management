import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, In, Repository, SelectQueryBuilder } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { RolesPersonasService } from '../roles-personas/roles-personas.service';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EjesPersonasService } from '../ejes-personas/ejes-personas.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacione } from '../organizaciones/entities/organizacione.entity';
import { AWSUtilsService } from '../../tools/AWS/utils/aws.utils';
import { MessageMicroservice } from '../../tools/broker/message.microservice';
import * as path from 'path';
import Handlebars from 'handlebars'
import * as fs from 'fs';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class PersonasService {
  private readonly mainRepo: Repository<Persona>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly _rolesPersonasService: RolesPersonasService,
    private readonly _rolesService: RolesService,
    private readonly _currentUser: CurrentUserUtil,
    private readonly _ejesPersonasService: EjesPersonasService,
    @InjectRepository(Organizacione)
    private readonly organizacionRepo: Repository<Organizacione>,
    private readonly awsUtilsService: AWSUtilsService,
    private readonly messageMicroservice: MessageMicroservice,
  ) {
    this.mainRepo = dataSource.getRepository(Persona);
  }

  async filterUsers(filters: { organizacion?: string; rol?: string; eje?: string; }) {
    const { organizacion, rol, eje } = filters;
  
    let query = await this.mainRepo
    .createQueryBuilder('persona')
    .leftJoinAndSelect('persona.organizacione', 'organizacion')
    .leftJoinAndSelect('roles_personas', 'rp', 'rp.persona_id = persona.id')
    .leftJoinAndSelect('roles', 'rol', 'rp.rol_id = rol.id')
    .leftJoinAndSelect('ejes_personas', 'ep', 'ep.persona_id = persona.id')
    .leftJoinAndSelect('GCF_ejes', 'eje', 'ep.eje_id = eje.id')
    .select([
      'persona.id',
      'persona.nombre',
      'persona.apellido',
      'persona.email',
      'organizacion.nombre_corto',
      'rol.nombre',
      'eje.nombre',	
    ]);

    if (organizacion) {
      console.log('organizacion:', organizacion);
      query = query
      .andWhere('organizacion.is_active = :isActive', { isActive: true })
      .andWhere('organizacion.id = :organizacion', { organizacion });
    }
  
    if (rol) {
      console.log('rol:', rol);
      query = query
      .andWhere('rol.is_active = :isActive', { isActive: true })
      .andWhere('rol.id = :rol', { rol });
    }
  
    if (eje) {
      console.log('eje:', eje);
      query = query
      .andWhere('eje.is_active = :isActive', { isActive: true })
      .andWhere('eje.id = :eje', { eje });
    }

    const result = await query.getRawMany();
    if (result.length === 0) {
      throw new NotFoundException('No se encontraron usuarios con los filtros especificados.');
    }
  
    console.log('Personas encontradas:', result);
    return result;
  }

  async findCurrentUser() {
    return this.mainRepo.findOne({
      where: {
        id: this._currentUser.user_id,
        is_active: true,
        rolesPersonas: {
          is_active: true,
        },
      },
      relations: {
        rolesPersonas: {
          rol: true,
        },
      },
    });
  }

  async create(newUser: CreateUserDto): Promise<Persona> {
    try{
        //Validación de campos requeridos
        const requiredFields = ['first_name', 'last_name', 'email', 'role_id', 'organizacion_id'];
        const missingFields = requiredFields.filter(field => !newUser[field]);
        if (missingFields.length > 0) {
          throw new BadRequestException('Formulario incompleto', {
            cause: new Error('Formulario incompleto. Complete todos los campos requeridos para continuar con el proceso.',),
          });
        }

        //Validación de formato de correo electrónico
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(newUser.email)) {
          throw new BadRequestException('Formato de correo incorrecto', {
            cause: new Error('El correo electrónico ingresado no tiene un formato válido.',),
          });
        }

        //Validación de dominio de correo electrónico con base en si es usuario CGIAR o no
        const organizacion = await this.organizacionRepo.findOne({
          where: { id: newUser.organizacion_id },
        });
        const domainMap = {
          CIAT: ['cgiar.org', 'gmail.com'],
          Agrosavia: ['agrosavia.co', 'gmail.com'],
          Asbama: ['asbama.com', 'gmail.com'], 
          Asocaña: ['asocana.org', 'gmail.com'], 
          Asohofrucol: ['asohofrucol.com.co', 'gmail.com'], 
          Augura: ['augura.com.co', 'gmail.com'], 
          Cenicafé: ['cafedecolombia.com', 'gmail.com'], 
          Cenicaña: ['cenicana.org', 'gmail.com'], 
          CIMMYT: ['cgiar.org', 'gmail.com'], 
          CIPAV: ['fun.cipav.org.co', 'gmail.com'],
          Fedearroz: ['fedearroz.com.co', 'gmail.com'],
          Fedegan: ['fedegan.org.co', 'gmail.com'],
          Fedepanela: ['fedepanela.org.co', 'gmail.com'], 
          Fedepapa: ['fedepapa.org', 'gmail.com'],
          Fenalce: ['fenalce.co', 'fenalceregional.org', 'fenalcecolombia.org', 'gmail.com'], 
          MADR: ['minagricultura.gov.co', 'gmail.com'] 
        };
        const dominiosCGIAR = [...domainMap['CIAT'], ...domainMap['CIMMYT']];
        const emailDomain = newUser.email.split('@')[1];

        if (newUser.is_cgiar) {
          const organizacionesPermitidas = ['CIAT', 'CIMMYT'];
          if (!organizacionesPermitidas.includes(organizacion.nombre_corto)) {
            throw new BadRequestException('Organización no válida', {
              cause: new Error('`La organización seleccionada no es válida para un usuario CGIAR.`',),
            });
          }     
          if (!dominiosCGIAR.includes(emailDomain)) {
            throw new BadRequestException('Correo no válido', {
              cause: new Error('Parece que este correo no es parte del dominio de la organización seleccionada. Verifique el correo electrónico ingresado.',),
            });
          }
        } else {
          /*if (dominiosCGIAR.includes(emailDomain)) {
            throw new BadRequestException('Correo no válido', {
              cause: new Error('Parece que este correo no es parte del dominio de la organización seleccionada. Verifique el correo electrónico ingresado.',),
            });
          }*/        
          const domainEsperado = domainMap[organizacion.nombre_corto];
          if (domainEsperado) {
            const esDominioValido = Array.isArray(domainEsperado)
              ? domainEsperado.includes(emailDomain)
              : emailDomain === domainEsperado;
        
            if (!esDominioValido) {
              throw new BadRequestException('Correo no válido', {
              cause: new Error('Parece que este correo no es parte del dominio de la organización seleccionada. Verifique el correo electrónico ingresado.',),
            });
            }
          }
        } //fin validación de dominio de correo electrónico

        //Validación de existencia de usuario
        const existingUser = await this.mainRepo.findOneBy({ email: newUser.email });
        if (existingUser) {
          throw new BadRequestException('Usuario duplicado', {
              cause: new Error('El nombre de usuario o correo electrónico ya está registrado. Por favor, intente con otro.',),
            });
        }
      
        //Creación de usuario en AWS Cognito
        let userResult: { email: string; password?: string };
        try {
          userResult = await this.awsUtilsService.createNewUser({
            email: newUser.email,
            firstName: newUser.first_name,
            lastName: newUser.last_name,
          }, newUser.is_cgiar ? undefined : true);
        } catch (error) {
          console.error('Error al registrar el usuario en AWS Cognito:', error);
          throw new InternalServerErrorException('Error de creación', {
              cause: new Error('Ocurrió un error en el servidor al intentar crear el usuario. Si el problema persiste, contacte al administrador técnico.',),
            });
        }   

        let personaCreada: any;
        try {
          personaCreada = await this.dataSource.transaction(async (manager) => {
          const resUser: Persona = await this.mainRepo.save({
            nombre: newUser.first_name,
            apellido: newUser.last_name,
            email: newUser.email,
            organizacion: newUser.organizacion_id,
          });

          await this._rolesPersonasService.create({
            primaryFilterKey: resUser.id,
            dataToSave: { rol_id: newUser.role_id },
            generalCompareKey: 'rol_id',
            manager,
            onlyCreate: true,
          });

          console.log('Eje ID recibido:', newUser.eje_id);
          if (newUser.eje_id !== undefined && newUser.eje_id !== null) {
            await this._ejesPersonasService.create({
              primaryFilterKey: resUser.id,
              dataToSave: { eje_id: newUser.eje_id },
              generalCompareKey: 'eje_id',
              manager,
              onlyCreate: true,
            });
          }

          const personaCreada = await manager
          .createQueryBuilder(Persona, 'persona')
          .leftJoinAndSelect('persona.organizacione', 'organizacion')
          .select([
            'persona.nombre',
            'persona.apellido',
            'persona.email',
            'organizacion.nombre_corto',
          ])
          .where('persona.id = :id', { id: resUser.id })
          .getOne();

          return personaCreada;
        });
        } catch (error) {
          console.error('Error en base de datos:', error);
          throw new InternalServerErrorException('Error de creación', {
              cause: new Error('Ocurrió un error en el servidor al intentar crear el usuario. Si el problema persiste, contacte al administrador técnico.',),
            });
        }

        

        const role = await this._rolesService.findOne(newUser.role_id);	
        console.log('Correo:', {
          nombre: personaCreada?.nombre,
          apellido: personaCreada?.apellido,
          correo: personaCreada?.email,
          password: userResult?.password || '(no generada)',
          organizacion: organizacion.nombre_corto,
          rol: role.nombre,
        });
        const templateSource = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Bienvenido/a a CAS Reporting Tool</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f6f8;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              max-width: 600px;
              margin: 30px auto;
              padding: 20px 30px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #2a7f62;
            }
            .content {
              font-size: 16px;
              color: #333333;
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              margin: 20px 0;
              padding: 12px 20px;
              background-color: #2a7f62;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #777777;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="{{urlLogo}}" alt="Logo CAS Reporting Tool" style="max-width: 180px; height: auto; margin-bottom: 20px;">
              <h1>¡Bienvenido/a {{nombre}} {{apellido}}!</h1>
            </div>
            <div class="content">
              <p>Su cuenta ha sido creada exitosamente en la plataforma <strong>CAS Reporting Tool</strong>.</p>
              <p>CAS Reporting Tool es una plataforma diseñada para gestionar de forma centralizada los entregables, desde los asociados hasta los equipos técnicos del CIAT en el proyecto Colombia Agroalimentaria Sostenible.</p>
              <p>A continuación encontrará la información necesaria para acceder por primera vez:</p>

              <p><strong>Usuario (correo electrónico):</strong> {{correo}}</p>
              {{#if password}}
                <p><strong>Contraseña temporal:</strong> {{password}}</p>
                <p>Le recomendamos iniciar sesión lo antes posible y cambiar su contraseña temporal por una personalizada y segura.</p>
              {{/if}}

              <p><strong>Rol asignado:</strong> {{rol}}</p>
              <p>{{rolDescripcion}}</p>
        
              <p style="text-align: center;">
                <a href="{{enlace}}" class="button">Acceder a la Plataforma</a>
              </p>
        
              <p>Si tiene alguna duda o inconveniente con el acceso, no dude en contactar a A.Jarrin@cgiar.org.</p>
            </div>
        
            <div class="footer">
              <p>Saludos cordiales,<br>
              Equipo CAS Reporting Tool<br>
              Colombia Agroalimentaria Sostenible</p>
            </div>
            <div class="disclaimer">
              <p>*** Por favor no responda a este correo, esta es una notificación automatizada ***</p>
            </div>
          </div>
        </body>
        </html>Equipo CAS Reporting Tool, Colombia Agroalimentaria Sostenible.
        `;
        const template = Handlebars.compile(templateSource);
        const context = {
          nombre: personaCreada.nombre,
          apellido: personaCreada.apellido,
          correo: personaCreada.email,
          password: userResult.password ? userResult.password : null,
          rol: role.nombre,
          rolDescripcion: role.descripcion,
          enlace: 'https://castest.ciat.cgiar.org/',
          urlLogo: 'https://media-resources-csicap.s3.us-east-1.amazonaws.com/organizations/Logo_oficial_Colombia_Agroalimentaria_Sostenible.png',
        };
        const html = template(context);
        const emailHtmlBuffer = Buffer.from(html);

        await this.messageMicroservice.sendEmail({
          subject: ' Bienvenido a CAS Reporting Tool - Acceso a su cuenta',
          to: personaCreada.email,
          bcc:'n.higuita@cgiar.org; a.jarrin@cgiar.org',
          message: {
            socketFile: emailHtmlBuffer,
          },
        });

        return personaCreada;

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
  
      console.error('Error al crear usuario:', error);
      throw new InternalServerErrorException('Error de creación', {
              cause: new Error('Ocurrió un error en el servidor al intentar crear el usuario. Si el problema persiste, contacte al administrador técnico.',),
            });
    }
  }

  async findById(id: number): Promise<Persona> {
    return this.mainRepo.findOne({
      where: {
        id: id,
        is_active: true,
      },
      relations: {
        rolesPersonas: {
          rol: true,
        },
      },
    });
  }

  async findUserLogin(email: string): Promise<Persona> {
    return this.mainRepo.findOne({
      where: {
        email: email,
        is_active: true,
      },
      relations: {
        rolesPersonas: {
          rol: true,
        },
      },
    });
  }

  async findByAttribute<K extends keyof Persona>(
    attribute: K,
    value: Persona[K],
  ): Promise<Persona> {
    return this.mainRepo.findOne({
      where: {
        [attribute]: value,
        is_active: true,
      },
    });
  }

  async findByIds(ids: number[]): Promise<Persona[]> {
    return this.mainRepo.find({
      where: {
        id: In(ids),
        is_active: true,
      },
    });
  }


  async update(id: number, updateUser: UpdateUserDto): Promise<Persona> {
    return this.dataSource
      .getRepository(Persona)
      .update(id, {
        nombre: updateUser.first_name,
        apellido: updateUser.last_name,
      })
      .then(() => this.findById(id));
  }
}