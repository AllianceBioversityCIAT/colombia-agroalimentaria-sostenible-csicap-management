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
        let rolesDeseados: number[] = [];

        if (nombreOrg === 'CIAT') {
          rolesDeseados = [4,5,6,7,8,9,10];
        }else if (nombreOrg === 'MADR') {
        rolesDeseados = [11];
        } else {
        rolesDeseados = [3, 2];
        }

        return this.rolRepository
        .createQueryBuilder('rol')
        .select(['rol.id', 'rol.nombre'])
        .where('rol.id IN (:...roles)', { roles: rolesDeseados })
        .getMany();

    }

    async findOne(id: number) {
        return this.rolRepository.findOne({
            where: { id },
        });
    }
      
}
