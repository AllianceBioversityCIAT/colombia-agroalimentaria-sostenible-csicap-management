import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { RolesPersonasService } from '../roles-personas/roles-personas.service';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class PersonasService {
  private readonly mainRepo: Repository<Persona>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly _rolesPersonasService: RolesPersonasService,
    private readonly _currentUser: CurrentUserUtil,
  ) {
    this.mainRepo = dataSource.getRepository(Persona);
  }

  async findCurrentUser() {
    return this.mainRepo.findOne({
      where: {
        id: this._currentUser.user_id,
        is_active: true,
        rolesPersonas: {
          is_active: true,
        },
      },
      relations: {
        rolesPersonas: {
          rol: true,
        },
      },
    });
  }

  async create(newUser: CreateUserDto): Promise<Persona> {
    return this.dataSource.transaction(async (manager) => {
      const resUser: Persona = await this.mainRepo.save({
        nombre: newUser.first_name,
        apellido: newUser.last_name,
        email: newUser.email,
      });

      await this._rolesPersonasService.create({
        primaryFilterKey: resUser.id,
        dataToSave: { rol_id: newUser.role_id },
        generalCompareKey: 'rol_id',
        manager,
        onlyCreate: true,
      });

      return resUser;
    });
  }

  async findById(id: number): Promise<Persona> {
    return this.mainRepo.findOne({
      where: {
        id: id,
        is_active: true,
      },
      relations: {
        rolesPersonas: {
          rol: true,
        },
      },
    });
  }

  async findUserLogin(email: string): Promise<Persona> {
    return this.mainRepo.findOne({
      where: {
        email: email,
        is_active: true,
      },
      relations: {
        rolesPersonas: {
          rol: true,
        },
      },
    });
  }

  async findByAttribute<K extends keyof Persona>(
    attribute: K,
    value: Persona[K],
  ): Promise<Persona> {
    return this.mainRepo.findOne({
      where: {
        [attribute]: value,
        is_active: true,
      },
    });
  }

  async findByIds(ids: number[]): Promise<Persona[]> {
    return this.mainRepo.find({
      where: {
        id: In(ids),
        is_active: true,
      },
    });
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<Persona> {
    return this.dataSource
      .getRepository(Persona)
      .update(id, {
        nombre: updateUser.first_name,
        apellido: updateUser.last_name,
      })
      .then(() => this.findById(id));
  }
}
