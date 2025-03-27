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

  async obtenerNombres() {
    return this.orgRepository
      .createQueryBuilder('org')
      .select([
        'org.nombre_corto',
        'org.logo',
      ])
      .getMany();
  }

  async obtenerDetalles(): Promise<Organizacione[]> {
    const resultado = await this.orgRepository.find();
    console.log('Organizaciones:', resultado);
    return resultado;
  }

/*  
  create(createOrganizacioneDto: CreateOrganizacioneDto) {
    return 'This action adds a new organizacione';
  } 

  async findAll() {
    return await this.orgRepository.find(); // ¡eager se encarga del resto!
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacione`;
  }

  update(id: number, updateOrganizacioneDto: UpdateOrganizacioneDto) {
    return `This action updates a #${id} organizacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacione`;
  } */
}
