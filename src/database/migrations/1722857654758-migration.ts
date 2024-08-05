import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722857654758 implements MigrationInterface {
    name = 'Migration1722857654758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`password_token\` DROP FOREIGN KEY \`FK_a7e9d2b757ebfbdb8b7f57e98ca\``);
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` DROP FOREIGN KEY \`FK_b0ae262a1934c6632e65a642f0e\``);
        await queryRunner.query(`ALTER TABLE \`password_token\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`password_token\` ADD CONSTRAINT \`FK_8191b7bec1971a7d8365be03d3d\` FOREIGN KEY (\`email\`) REFERENCES \`user\`(\`email\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` ADD CONSTRAINT \`FK_af3aea1c5f9f8ab5e4cb602d6d4\` FOREIGN KEY (\`email\`) REFERENCES \`user\`(\`email\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` DROP FOREIGN KEY \`FK_af3aea1c5f9f8ab5e4cb602d6d4\``);
        await queryRunner.query(`ALTER TABLE \`password_token\` DROP FOREIGN KEY \`FK_8191b7bec1971a7d8365be03d3d\``);
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`password_token\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` ADD CONSTRAINT \`FK_b0ae262a1934c6632e65a642f0e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`password_token\` ADD CONSTRAINT \`FK_a7e9d2b757ebfbdb8b7f57e98ca\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
