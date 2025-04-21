import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Organizacione } from './entities/organizacione.entity';


@Injectable()
export class OrganizacionesService {
  private readonly orgRepository: Repository<Organizacione>;
  constructor(private readonly dataSource: DataSource) {
    this.orgRepository = dataSource.getRepository(Organizacione);
  }

  async obtenerId() {
    const query = this.orgRepository
    .createQueryBuilder('org')
    .where('org.is_active = :isActive', { isActive: true })
    .select([
      'org.id',
      'org.nombre_corto',
    ])
    .getMany();

    return query;
  }

  async obtenerDetalles(): Promise<Organizacione[]> {
    const resultado = await this.orgRepository.find({
      where: {
        is_active: true
      }
    });
    return resultado;
  }

  async obtenerNombres(searchTerm: string) {
    const query = this.orgRepository
      .createQueryBuilder('org')
      .where('org.is_active = :isActive', { isActive: true })
      .select([
        'org.id',
        'org.nombre_corto',
        'org.logo',
      ]);

      if (searchTerm) {
        query.andWhere('org.nombre_corto LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
      }
      
    const results = await query.getRawMany();

    if (results.length === 0) {
      throw new NotFoundException('No existen organizaciones que coincidan con su búsqueda.');
    }

    return results;
  }

  async getFiltradas(isCGIAR: boolean) {
    const query = this.orgRepository.createQueryBuilder('org');

    if (isCGIAR) {
      const incluidas = ['CIAT', 'CYMMIT'];
      return query
      .select(['org.id', 'org.nombre_corto'])
      .where('org.nombre_corto IN (:...incluidas)', { incluidas })
      .getMany();
    } else {
      const excluidas = ['CIAT', 'CYMMIT'];
      return query
        .select(['org.id', 'org.nombre_corto'])
        .where('org.nombre_corto NOT IN (:...excluidas)', { excluidas })
        .getMany();
    }
  }


}
