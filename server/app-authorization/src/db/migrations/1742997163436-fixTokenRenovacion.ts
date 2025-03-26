import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTokenRenovacion1742997163436 implements MigrationInterface {
    name = 'FixTokenRenovacion1742997163436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` DROP FOREIGN KEY \`FK_174b6bd7dd0855ac7fb22c150aa\``);
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` ADD CONSTRAINT \`FK_f51cf6a62703df622856dc76d5b\` FOREIGN KEY (\`persona_id\`) REFERENCES \`personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` DROP FOREIGN KEY \`FK_f51cf6a62703df622856dc76d5b\``);
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` ADD \`user_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`tokens_renovacion\` ADD CONSTRAINT \`FK_174b6bd7dd0855ac7fb22c150aa\` FOREIGN KEY (\`user_id\`) REFERENCES \`personas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
