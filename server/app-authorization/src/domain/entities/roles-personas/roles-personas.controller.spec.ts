import { Test, TestingModule } from '@nestjs/testing';
import { RolesPersonasController } from './roles-personas.controller';
import { RolesPersonasService } from './roles-personas.service';

describe('RolesPersonasController', () => {
  let controller: RolesPersonasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesPersonasController],
      providers: [RolesPersonasService],
    }).compile();

    controller = module.get<RolesPersonasController>(RolesPersonasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
