import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { Persona } from '../../personas/entities/persona.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('roles_personas')
export class RolesPersona extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'bigint',
    name: 'persona_id',
    nullable: false,
  })
  persona_id: number;

  @Column({
    type: 'bigint',
    name: 'rol_id',
    nullable: false,
  })
  rol_id: number;

  @ManyToOne(() => Persona, (persona) => persona.rolesPersonas)
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @ManyToOne(() => Role, (role) => role.rolesPersonas)
  @JoinColumn({ name: 'rol_id' })
  rol: Role;
}
