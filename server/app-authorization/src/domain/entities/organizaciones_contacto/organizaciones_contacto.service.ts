import { Injectable } from '@nestjs/common';
import { CreateOrganizacionesContactoDto } from './dto/create-organizaciones_contacto.dto';
import { UpdateOrganizacionesContactoDto } from './dto/update-organizaciones_contacto.dto';

@Injectable()
export class OrganizacionesContactoService {
  create(createOrganizacionesContactoDto: CreateOrganizacionesContactoDto) {
    return 'This action adds a new organizacionesContacto';
  }

  findAll() {
    return `This action returns all organizacionesContacto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacionesContacto`;
  }

  update(id: number, updateOrganizacionesContactoDto: UpdateOrganizacionesContactoDto) {
    return `This action updates a #${id} organizacionesContacto`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacionesContacto`;
  }
}
