import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigrationManagement1742569402814 implements MigrationInterface {
    name = 'FirstMigrationManagement1742569402814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tokens_renovacion\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`codigo\` varchar(36) NOT NULL, \`persona_id\` bigint NOT NULL, \`fecha_expiracion\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` bigint NULL, PRIMARY KEY (\`codigo\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`organizaciones\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` varchar(60) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ejes_personas\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`id\` bigint NOT NULL AUTO_INCREMENT, \`persona_id\` bigint NOT NULL, \`eje_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`personas\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` text NULL, \`apellido\` text NULL, \`email\` text NOT NULL, \`organizacion\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_personas\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`id\` bigint NOT NULL AUTO_INCREMENT, \`persona_id\` bigint NOT NULL, \`rol_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`id\` bigint NOT NULL AUTO_INCREMENT, \`nombre\` varchar(60) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` ADD CONSTRAINT \`FK_174b6bd7dd0855ac7fb22c150aa\` FOREIGN KEY (\`user_id\`) REFERENCES \`personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ejes_personas\` ADD CONSTRAINT \`FK_4ce1e141a9b634c4f8b4623ce95\` FOREIGN KEY (\`persona_id\`) REFERENCES \`personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personas\` ADD CONSTRAINT \`FK_ea2053e172bf1cd6e05ef1b9f43\` FOREIGN KEY (\`organizacion\`) REFERENCES \`organizaciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_personas\` ADD CONSTRAINT \`FK_1e1e3c9a34f0db4cab0a2181b8c\` FOREIGN KEY (\`persona_id\`) REFERENCES \`personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_personas\` ADD CONSTRAINT \`FK_a381f363c15263702f163147d7c\` FOREIGN KEY (\`rol_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_personas\` DROP FOREIGN KEY \`FK_a381f363c15263702f163147d7c\``);
        await queryRunner.query(`ALTER TABLE \`roles_personas\` DROP FOREIGN KEY \`FK_1e1e3c9a34f0db4cab0a2181b8c\``);
        await queryRunner.query(`ALTER TABLE \`personas\` DROP FOREIGN KEY \`FK_ea2053e172bf1cd6e05ef1b9f43\``);
        await queryRunner.query(`ALTER TABLE \`ejes_personas\` DROP FOREIGN KEY \`FK_4ce1e141a9b634c4f8b4623ce95\``);
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` DROP FOREIGN KEY \`FK_174b6bd7dd0855ac7fb22c150aa\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles_personas\``);
        await queryRunner.query(`DROP TABLE \`personas\``);
        await queryRunner.query(`DROP TABLE \`ejes_personas\``);
        await queryRunner.query(`DROP TABLE \`organizaciones\``);
        await queryRunner.query(`DROP TABLE \`tokens_renovacion\``);
    }

}
