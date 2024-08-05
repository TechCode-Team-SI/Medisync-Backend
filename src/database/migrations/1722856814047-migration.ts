import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722856814047 implements MigrationInterface {
    name = 'Migration1722856814047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`confirm_email_token\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiresAt\` datetime NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` ADD CONSTRAINT \`FK_b0ae262a1934c6632e65a642f0e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`confirm_email_token\` DROP FOREIGN KEY \`FK_b0ae262a1934c6632e65a642f0e\``);
        await queryRunner.query(`DROP TABLE \`confirm_email_token\``);
    }

}
