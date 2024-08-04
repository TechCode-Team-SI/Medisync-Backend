import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722794886694 implements MigrationInterface {
  name = 'Migration1722794886694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`password_token\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiresAt\` datetime NOT NULL, \`emailId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` ADD CONSTRAINT \`FK_1f133431946966b4ebf884189a5\` FOREIGN KEY (\`emailId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`password_token\` DROP FOREIGN KEY \`FK_1f133431946966b4ebf884189a5\``,
    );
    await queryRunner.query(`DROP TABLE \`password_token\``);
  }
}
