import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableEntity {
  @CreateDateColumn({
    type: 'timestamp',
    name: 'fecha_creacion',
    nullable: false,
    select: false,
  })
  fecha_creacion: Date;

  @Column({
    type: 'bigint',
    name: 'creado_por',
    nullable: true,
    select: false,
  })
  creado_por: number;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'fecha_actualizacion',
    nullable: true,
    select: false,
  })
  fecha_actualizacion: Date;

  @Column({
    type: 'bigint',
    name: 'actualizado_por',
    nullable: true,
    select: false,
  })
  actualizado_por: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
    select: true,
  })
  is_active: boolean;
}
