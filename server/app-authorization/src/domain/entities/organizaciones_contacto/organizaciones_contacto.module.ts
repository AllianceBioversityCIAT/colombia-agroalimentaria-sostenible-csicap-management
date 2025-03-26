import { Module } from '@nestjs/common';
import { OrganizacionesContactoService } from './organizaciones_contacto.service';
import { OrganizacionesContactoController } from './organizaciones_contacto.controller';

@Module({
  controllers: [OrganizacionesContactoController],
  providers: [OrganizacionesContactoService],
})
export class OrganizacionesContactoModule {}
