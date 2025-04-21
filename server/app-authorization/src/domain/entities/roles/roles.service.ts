import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacione } from '../organizaciones/entities/organizacione.entity';

@Injectable()
export class RolesService {
    private readonly rolRepository: Repository<Role>;
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Organizacione)
        private readonly organizacionRepo: Repository<Organizacione>,
    ) {
        this.rolRepository = dataSource.getRepository(Role);
    }

    async findRoles() {
        return this.rolRepository
            .createQueryBuilder('rol')
            .select([
                'rol.id',
                'rol.nombre',
            ])
            .getMany();
    }

    async getPorOrganizacion(organizacion: number) {

        const org = await this.organizacionRepo.findOne({
            where: { id: organizacion },
          });
        
          if (!org) {
            throw new NotFoundException(`La organización con ID ${organizacion} no existe.`);
          }

        const nombreOrg = org.nombre_corto.toUpperCase();
        let rolesDeseados: string[] = [];

        if (nombreOrg === 'CIAT') {
          rolesDeseados = [
            'Líder de eje CIAT',
            'Gestor de reportes',
            'Gestor GMU',
            'Gestor Plans',
            'Gestor de coordinación técnica',
            'Líder de coordinación técnica',
            'Líder de Proyecto',
          ];
        }else if (nombreOrg === 'MADR') {
        rolesDeseados = ['Usuario MADR'];
        } else {
        rolesDeseados = ['Punto Focal', 'Observador'];
        }

        return this.rolRepository
        .createQueryBuilder('rol')
        .select(['rol.id', 'rol.nombre'])
        .where('rol.nombre IN (:...roles)', { roles: rolesDeseados })
        .getMany();

    }
      
}
