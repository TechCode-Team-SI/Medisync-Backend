import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727293586794 implements MigrationInterface {
  name = 'Migration1727293586794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP FOREIGN KEY \`FK_ff086f000904326dcc02b385aa0\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ff086f000904326dcc02b385aa\` ON \`diagnostic_symptom\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnostic_treatment\` (\`diagnosticId\` varchar(36) NOT NULL, \`treatmentId\` varchar(36) NOT NULL, INDEX \`IDX_41b6e13c850065c53f46f5176f\` (\`diagnosticId\`), INDEX \`IDX_3e06808f40dfc80478458aabfa\` (\`treatmentId\`), PRIMARY KEY (\`diagnosticId\`, \`treatmentId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP COLUMN \`treatmentId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_treatment\` ADD CONSTRAINT \`FK_41b6e13c850065c53f46f5176fc\` FOREIGN KEY (\`diagnosticId\`) REFERENCES \`diagnostic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_treatment\` ADD CONSTRAINT \`FK_3e06808f40dfc80478458aabfac\` FOREIGN KEY (\`treatmentId\`) REFERENCES \`treatment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_treatment\` DROP FOREIGN KEY \`FK_3e06808f40dfc80478458aabfac\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_treatment\` DROP FOREIGN KEY \`FK_41b6e13c850065c53f46f5176fc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD \`treatmentId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`treatmentId\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3e06808f40dfc80478458aabfa\` ON \`diagnostic_treatment\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_41b6e13c850065c53f46f5176f\` ON \`diagnostic_treatment\``,
    );
    await queryRunner.query(`DROP TABLE \`diagnostic_treatment\``);
    await queryRunner.query(
      `CREATE INDEX \`IDX_ff086f000904326dcc02b385aa\` ON \`diagnostic_symptom\` (\`treatmentId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD CONSTRAINT \`FK_ff086f000904326dcc02b385aa0\` FOREIGN KEY (\`treatmentId\`) REFERENCES \`treatment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
