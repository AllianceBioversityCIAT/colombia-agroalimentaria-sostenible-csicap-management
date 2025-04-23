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

@Injectable()
export class PersonasService {
  private readonly mainRepo: Repository<Persona>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly _rolesPersonasService: RolesPersonasService,
    private readonly _currentUser: CurrentUserUtil,
    private readonly _ejesPersonasService: EjesPersonasService,
    @InjectRepository(Organizacione)
    private readonly organizacionRepo: Repository<Organizacione>,
    private readonly awsUtilsService: AWSUtilsService,
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
        throw new BadRequestException(
          `Formulario incompleto. Complete todos los campos requeridos para continuar con el proceso.`,
        );
      }

      //Validación de formato de correo electrónico
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(newUser.email)) {
        throw new BadRequestException(
          'El correo electrónico ingresado no tiene un formato válido.'
        );
      }

      //Validación de dominio de correo electrónico con base en si es usuario CGIAR o no
      const organizacion = await this.organizacionRepo.findOne({
        where: { id: newUser.organizacion_id },
      });
      const domainMap = {
        CIAT: ['cgiar.org'],
        Agrosavia: ['agrosavia.co'],
        Asbama: ['asbama.com'], 
        Asocaña: ['asocana.org'], 
        Asohofrucol: ['asohofrucol.com.co'], 
        Augura: ['augura.com.co'], 
        Cenicafé: ['cafedecolombia.com'], 
        Cenicaña: ['cenicana.org'], 
        CIMMYT: ['cgiar.org'], 
        CIPAV: ['fun.cipav.org.co'],
        Fedearroz: ['fedearroz.com.co'],
        Fedegan: ['fedegan.org.co'],
        Fedepanela: ['fedepanela.org.co'], 
        Fedepapa: ['fedepapa.org'],
        Fenalce: ['fenalce.co', 'fenalceregional.org', 'fenalcecolombia.org'], 
        MADR: ['minagricultura.gov.co'] 
      };

      const dominiosCIAT = domainMap['CIAT'] || [];
      const dominiosCIMMYT = domainMap['CIMMYT'] || [];
      const dominiosCGIAR = [...dominiosCIAT, ...dominiosCIMMYT];

      const emailDomain = newUser.email.split('@')[1];
      if (newUser.is_cgiar) {
        const organizacionesPermitidas = ['CIAT', 'CIMMYT'];
        if (!organizacionesPermitidas.includes(organizacion.nombre_corto)) {
          throw new BadRequestException(
            `La organización seleccionada no es válida para un usuario CGIAR.`
          );
        }
      
        if (!dominiosCGIAR.includes(emailDomain)) {
          throw new BadRequestException(
             `El correo no pertenece a un dominio permitido para la organización ${organizacion.nombre_corto}.`
          );
        }
      } else {
        if (dominiosCGIAR.includes(emailDomain)) {
          throw new BadRequestException(
            `Se ha detectado un correo CGIAR para un usuario NO CGIAR.`
          );
        }
      
        const domainEsperado = domainMap[organizacion.nombre_corto];
        if (domainEsperado) {
          const esDominioValido = Array.isArray(domainEsperado)
            ? domainEsperado.includes(emailDomain)
            : emailDomain === domainEsperado;
      
          if (!esDominioValido) {
            throw new BadRequestException(
              `El correo no pertenece a un dominio permitido para la organización ${organizacion.nombre_corto}.`
            );
          }
        }
      }

      //Validación de existencia de usuario
      const existingUser = await this.mainRepo.findOneBy({ email: newUser.email });
      if (existingUser) {
        throw new BadRequestException(
          'El nombre de usuario o correo electrónico ya está registrado. Por favor, intente con otro.'
        );
      }

      //Creación de usuario en AWS Cognito
      try {
        await this.awsUtilsService.createNewUser({
          email: newUser.email,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
        }, newUser.is_cgiar ? undefined : true);
      } catch (error) {
        console.error('Error al registrar el usuario en AWS Cognito:', error);
        throw new InternalServerErrorException(
          'No fue posible registrar el usuario en el sistema de autenticación. Si el problema persiste, contacte al administrador técnico.'
        );
      }   

      //Creación de usuario en la base de datos
      return this.dataSource.transaction(async (manager) => {
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

        const personaConOrg = await manager
        .createQueryBuilder(Persona, 'persona')
        .leftJoinAndSelect('persona.organizacione', 'organizacion')
        .select([
          'persona.nombre',
          'persona.apellido',
          'persona.email',
          'organizacion.nombre',
        ])
        .where('persona.id = :id', { id: resUser.id })
        .getOne();

        return personaConOrg;
      });
  
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
  
      console.error('Error al crear usuario:', error);
      throw new InternalServerErrorException(
        'Ocurrió un error en el servidor al intentar crear el usuario. Si el problema persiste, contacte al administrador técnico.'
      );
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
