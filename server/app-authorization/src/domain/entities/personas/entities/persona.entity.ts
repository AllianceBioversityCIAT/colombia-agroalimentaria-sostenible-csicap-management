import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { TokensRenovacion } from '../../tokens-renovacion/entities/refresh-token.entity';
import { RolesPersona } from '../../roles-personas/entities/roles-persona.entity';
import { Organizacione } from '../../organizaciones/entities/organizacione.entity';
import { EjesPersona } from '../../ejes-personas/entities/ejes-persona.entity';

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

  @Column({
    type: 'bigint',
    name: 'organizacion',
    nullable: true,
  })
  organizacion: number;

  @OneToMany(
    () => TokensRenovacion,
    (tokensRenovacion) => tokensRenovacion.persona,
  )
  tokensRenovacion: TokensRenovacion[];

  @OneToMany(() => RolesPersona, (rolesPersona) => rolesPersona.persona)
  rolesPersonas: RolesPersona[];

  @OneToMany(() => EjesPersona, (ejesPersona) => ejesPersona.persona)
  ejesPersona: EjesPersona[];

  @ManyToOne(() => Organizacione, (organizacion) => organizacion.personas)
  @JoinColumn({ name: 'organizacion' })
  organizacione: Organizacione;
}
