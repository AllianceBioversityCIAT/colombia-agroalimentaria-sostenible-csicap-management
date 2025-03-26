import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "../../personas/entities/persona.entity";
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';


@Entity('ejes_personas')
export class EjesPersona extends AuditableEntity{

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    id: number;

    @Column({
        name: 'persona_id',
        type: 'bigint',
    })
    persona_id: number;

    @Column({
        name: 'eje_id',
        type: 'bigint',
    })
    eje_id: number;

    @ManyToOne(() => Persona, (persona) => persona.ejesPersona)
    @JoinColumn({ name: 'persona_id' })
    persona: Persona;

}
