import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionesContactoService } from './organizaciones_contacto.service';

describe('OrganizacionesContactoService', () => {
  let service: OrganizacionesContactoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizacionesContactoService],
    }).compile();

    service = module.get<OrganizacionesContactoService>(OrganizacionesContactoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
