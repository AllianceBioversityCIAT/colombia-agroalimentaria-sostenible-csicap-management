import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { TokensRenovacion } from '../../tokens-renovacion/entities/refresh-token.entity';
import { RolesPersona } from '../../roles-personas/entities/roles-persona.entity';

@Entity('personas')
export class Persona extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'nombre',
    nullable: true,
  })
  nombre?: string;

  @Column({
    type: 'text',
    name: 'apellido',
    nullable: true,
  })
  apellido?: string;

  @Column({
    type: 'text',
    name: 'email',
  })
  email: string;

  @OneToMany(
    () => TokensRenovacion,
    (tokensRenovacion) => tokensRenovacion.persona,
  )
  tokensRenovacion: TokensRenovacion[];

  @OneToMany(() => RolesPersona, (rolesPersona) => rolesPersona.persona)
  rolesPersonas: RolesPersona[];
}
