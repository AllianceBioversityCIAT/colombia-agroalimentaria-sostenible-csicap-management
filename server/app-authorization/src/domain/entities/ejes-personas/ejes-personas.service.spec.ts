import { Test, TestingModule } from '@nestjs/testing';
import { EjesPersonasService } from './ejes-personas.service';

describe('EjesPersonasService', () => {
  let service: EjesPersonasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjesPersonasService],
    }).compile();

    service = module.get<EjesPersonasService>(EjesPersonasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
