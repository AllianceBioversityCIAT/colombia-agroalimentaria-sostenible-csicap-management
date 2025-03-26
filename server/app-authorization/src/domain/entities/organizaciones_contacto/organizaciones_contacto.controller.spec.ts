import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionesContactoController } from './organizaciones_contacto.controller';
import { OrganizacionesContactoService } from './organizaciones_contacto.service';

describe('OrganizacionesContactoController', () => {
  let controller: OrganizacionesContactoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizacionesContactoController],
      providers: [OrganizacionesContactoService],
    }).compile();

    controller = module.get<OrganizacionesContactoController>(OrganizacionesContactoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
