import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723391860454 implements MigrationInterface {
  name = 'Migration1723391860454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`ticket_comment\` (\`id\` varchar(36) NOT NULL, \`comment\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ticketId\` varchar(36) NULL, \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` ADD CONSTRAINT \`FK_653665e6f8dd8c3d0d0f3a07598\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` ADD CONSTRAINT \`FK_819e85ab54dafac7fe03b09dadf\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` DROP FOREIGN KEY \`FK_819e85ab54dafac7fe03b09dadf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` DROP FOREIGN KEY \`FK_653665e6f8dd8c3d0d0f3a07598\``,
    );
    await queryRunner.query(`DROP TABLE \`ticket_comment\``);
  }
}
