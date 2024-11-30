import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727299333188 implements MigrationInterface {
  name = 'Migration1727299333188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`agenda\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`weekdays\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_3ca65970336d8ac2bb7fea64df\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`specialty\` ADD \`agendaId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`agendaId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`treatment\` ADD UNIQUE INDEX \`IDX_30dffe299fe6ba8c1718fa93d8\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`symptom\` ADD UNIQUE INDEX \`IDX_7cae634d3300e9f2c5e9f5ad6d\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`injury\` ADD UNIQUE INDEX \`IDX_7a0adf37818783c0f09e462733\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`specialty\` ADD CONSTRAINT \`FK_28e5c628f453d1951f568fe0c1e\` FOREIGN KEY (\`agendaId\`) REFERENCES \`agenda\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD CONSTRAINT \`FK_cd4405bea62e60954b06085d918\` FOREIGN KEY (\`agendaId\`) REFERENCES \`agenda\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP FOREIGN KEY \`FK_cd4405bea62e60954b06085d918\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`specialty\` DROP FOREIGN KEY \`FK_28e5c628f453d1951f568fe0c1e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`injury\` DROP INDEX \`IDX_7a0adf37818783c0f09e462733\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`symptom\` DROP INDEX \`IDX_7cae634d3300e9f2c5e9f5ad6d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`treatment\` DROP INDEX \`IDX_30dffe299fe6ba8c1718fa93d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`agendaId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`specialty\` DROP COLUMN \`agendaId\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3ca65970336d8ac2bb7fea64df\` ON \`agenda\``,
    );
    await queryRunner.query(`DROP TABLE \`agenda\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
