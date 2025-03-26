import { Injectable } from '@nestjs/common';
import { CreateOrganizacioneDto } from './dto/create-organizacione.dto';
import { UpdateOrganizacioneDto } from './dto/update-organizacione.dto';
import { DataSource, Repository } from 'typeorm';
import { Organizacione } from './entities/organizacione.entity';
import { dataSource } from '../../../db/config/mysql/orm.config';

@Injectable()
export class OrganizacionesService {
  private readonly orgRepository: Repository<Organizacione>;
  constructor(private readonly dataSource: DataSource) {
    this.orgRepository = dataSource.getRepository(Organizacione);
  }

  async obtenerNombres(): Promise<string[]> {
    const nombres = await this.orgRepository
      .createQueryBuilder('org')
      .select('org.nombre_corto')
      .getRawMany();

    console.log(nombres);  
    return nombres.map((item) => item.org_nombre_corto);
  }


  create(createOrganizacioneDto: CreateOrganizacioneDto) {
    return 'This action adds a new organizacione';
  }

  async findAll(): Promise<Organizacione[]> {
    const resultado = await this.orgRepository.find();
    console.log('Organizaciones:', resultado);
    return resultado;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacione`;
  }

  update(id: number, updateOrganizacioneDto: UpdateOrganizacioneDto) {
    return `This action updates a #${id} organizacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacione`;
  }
}
