import { MigrationInterface, QueryRunner } from "typeorm";

export class OrganizacionesModification1742940914992 implements MigrationInterface {
    name = 'OrganizacionesModification1742940914992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`organizaciones_contacto\` (\`fecha_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creado_por\` bigint NULL, \`fecha_actualizacion\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`actualizado_por\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`id\` bigint NOT NULL AUTO_INCREMENT, \`organizacion\` bigint NULL, \`nombre_contacto\` text NOT NULL, \`rol\` text NOT NULL, \`email_contacto\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`nombre_corto\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`nombre_largo\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`tipo_organizacion\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`proposito\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`sistemas_productivos\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`sitio_web\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`email\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`numero_telefono\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`direccion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`logo\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`organizaciones_contacto\` ADD CONSTRAINT \`FK_c1fd1d4bc0c6bf59ba37baff789\` FOREIGN KEY (\`organizacion\`) REFERENCES \`organizaciones\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`organizaciones_contacto\` DROP FOREIGN KEY \`FK_c1fd1d4bc0c6bf59ba37baff789\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`logo\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`direccion\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`numero_telefono\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`sitio_web\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`sistemas_productivos\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`proposito\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`tipo_organizacion\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`nombre_largo\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` DROP COLUMN \`nombre_corto\``);
        await queryRunner.query(`ALTER TABLE \`organizaciones\` ADD \`nombre\` varchar(60) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`organizaciones_contacto\``);
    }

}
