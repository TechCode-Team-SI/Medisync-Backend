import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727358993848 implements MigrationInterface {
  name = 'Migration1727358993848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`days_off\` (\`id\` varchar(36) NOT NULL, \`from\` datetime NOT NULL, \`to\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`agendaId\` varchar(36) NULL, \`employeeProfileId\` varchar(36) NULL, \`specialtyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`days_off\` ADD CONSTRAINT \`FK_06abd9dfca91cbc276f99b2d992\` FOREIGN KEY (\`agendaId\`) REFERENCES \`agenda\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`days_off\` ADD CONSTRAINT \`FK_af7db14ebdf1a68804dc6a7c14b\` FOREIGN KEY (\`employeeProfileId\`) REFERENCES \`employee_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`days_off\` ADD CONSTRAINT \`FK_82325a55b4be61099d00a36bfc9\` FOREIGN KEY (\`specialtyId\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`days_off\` DROP FOREIGN KEY \`FK_82325a55b4be61099d00a36bfc9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`days_off\` DROP FOREIGN KEY \`FK_af7db14ebdf1a68804dc6a7c14b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`days_off\` DROP FOREIGN KEY \`FK_06abd9dfca91cbc276f99b2d992\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(`DROP TABLE \`days_off\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
