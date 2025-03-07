import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { Persona } from '../../personas/entities/persona.entity';

@Entity('tokens_renovacion')
export class TokensRenovacion extends AuditableEntity {
  @Column({
    type: 'varchar',
    length: 36,
    primary: true,
    nullable: false,
    name: 'codigo',
  })
  codigo: string;

  @Column({
    type: 'bigint',
    name: 'persona_id',
    nullable: false,
  })
  persona_id: number;

  @Column({
    type: 'timestamp',
    name: 'fecha_expiracion',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_expiracion: Date;

  @ManyToOne(() => Persona, (persona) => persona.tokensRenovacion)
  @JoinColumn({ name: 'user_id' })
  persona: Persona;
}
