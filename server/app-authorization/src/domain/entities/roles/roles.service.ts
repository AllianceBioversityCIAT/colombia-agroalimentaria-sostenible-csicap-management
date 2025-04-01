import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
    private readonly rolRepository: Repository<Role>;
    constructor(private readonly dataSource: DataSource) {
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
}
