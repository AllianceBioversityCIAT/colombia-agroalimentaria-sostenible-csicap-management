import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsUrl } from 'class-validator';
import { Persona } from "../../personas/entities/persona.entity";
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { OrganizacionesContacto } from "../../organizaciones_contacto/entities/organizaciones_contacto.entity";

@Entity('organizaciones')
export class Organizacione extends AuditableEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'text',
        name: 'nombre_corto',
    })
    nombre_corto: string;

    @Column({
        type: 'text',
        name: 'nombre_largo',
    })
    nombre: string;

    @Column({
        type: 'text',
        name: 'tipo_organizacion',
    })
    tipo_organizacion: string;

    @Column({
        type: 'text',
        name: 'proposito',
    })
    proposito: string;

    @Column({
        type: 'text',
        name: 'sistemas_productivos',
    })
    sistemas_productivos: string;

    @Column({
        type: 'text',	
        name: 'sitio_web',
    })
    @IsUrl({}, {message: 'El campo sitio_web debe ser una URL válida'})
    sitio_web: string;

    @Column({
        type: 'text',
        name: 'email',
        nullable: true,
    })
    email: string;

    @Column({
        type: 'text',
        name: 'numero_telefono',
        nullable: true,
    })
    numero_telefono: string;

    @Column({
        type: 'text',
        name: 'direccion',
        nullable: true,
    })
    direccion: string;

    @Column({
        type: 'text',
        name: 'logo',
        nullable: true,
    })
    @IsUrl({}, {message: 'El campo logo debe ser una URL válida'})
    logo: string;

    @OneToMany(() => Persona, (persona) => persona.organizacion)
    personas: Persona[];

    @OneToMany(() => OrganizacionesContacto, (organizacionesContacto) => organizacionesContacto.organizacion)
    contactos: OrganizacionesContacto[];

}
