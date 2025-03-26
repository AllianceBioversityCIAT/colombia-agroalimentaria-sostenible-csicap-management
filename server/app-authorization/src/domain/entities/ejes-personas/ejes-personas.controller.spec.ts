import { Test, TestingModule } from '@nestjs/testing';
import { EjesPersonasController } from './ejes-personas.controller';
import { EjesPersonasService } from './ejes-personas.service';

describe('EjesPersonasController', () => {
  let controller: EjesPersonasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjesPersonasController],
      providers: [EjesPersonasService],
    }).compile();

    controller = module.get<EjesPersonasController>(EjesPersonasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
