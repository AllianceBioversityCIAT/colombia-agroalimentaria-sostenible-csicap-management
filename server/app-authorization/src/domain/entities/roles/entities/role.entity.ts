import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';
import { RolesPersona } from '../../roles-personas/entities/roles-persona.entity';

@Entity('roles')
export class Role extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 60,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    name: 'descripcion',
    length: 600,
  })
  descripcion: string;

  @OneToMany(() => RolesPersona, (rolesPersona) => rolesPersona.rol)
  rolesPersonas: RolesPersona[];
}
