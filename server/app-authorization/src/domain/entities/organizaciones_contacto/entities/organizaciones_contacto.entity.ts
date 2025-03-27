import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { Organizacione } from "../../organizaciones/entities/organizacione.entity";



@Entity('organizaciones_contacto')
export class OrganizacionesContacto extends AuditableEntity{

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'bigint',
        name: 'organizacion',
        nullable: true,
    })
    organizacion: string;

    @Column({
        type: 'text',
        name: 'nombre_contacto',
    })
    nombre_contacto: string;

    @Column({
        type: 'text',
        name: 'rol',
    })
    rol: string;


    @Column({
        type: 'text',
        name: 'email_contacto',
    })
    email_contacto: string;

    @ManyToOne(() => Organizacione, (organizacion) => organizacion.organizacionesContactos)
    @JoinColumn({ name: 'organizacion' })
    organizacione: Organizacione;



}
