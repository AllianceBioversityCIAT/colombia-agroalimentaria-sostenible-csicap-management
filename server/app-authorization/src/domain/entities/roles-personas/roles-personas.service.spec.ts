import { Test, TestingModule } from '@nestjs/testing';
import { RolesPersonasService } from './roles-personas.service';

describe('RolesPersonasService', () => {
  let service: RolesPersonasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesPersonasService],
    }).compile();

    service = module.get<RolesPersonasService>(RolesPersonasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
