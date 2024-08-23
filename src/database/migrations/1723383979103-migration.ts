import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723383979103 implements MigrationInterface {
  name = 'Migration1723383979103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`ticket\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` enum ('suggestion', 'complaint') NOT NULL, \`status\` enum ('open', 'attending', 'closed') NOT NULL DEFAULT 'open', \`closedAt\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_5ad32ee9565f98cf1359fef29c2\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_5ad32ee9565f98cf1359fef29c2\``,
    );
    await queryRunner.query(`DROP TABLE \`ticket\``);
  }
}
