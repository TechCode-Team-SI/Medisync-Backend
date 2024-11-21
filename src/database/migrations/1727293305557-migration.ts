import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727293305557 implements MigrationInterface {
  name = 'Migration1727293305557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`treatment\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`symptom\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`pathology\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`illness\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`injury\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnostic_illness\` (\`diagnosticId\` varchar(36) NOT NULL, \`illnessId\` varchar(36) NOT NULL, INDEX \`IDX_f32b21d87e2d3fd3818a9a6b8d\` (\`diagnosticId\`), INDEX \`IDX_11b29ff24aee8d72afe099219c\` (\`illnessId\`), PRIMARY KEY (\`diagnosticId\`, \`illnessId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnostic_injury\` (\`diagnosticId\` varchar(36) NOT NULL, \`injuryId\` varchar(36) NOT NULL, INDEX \`IDX_cdc9faa1ca20cae442728d76e0\` (\`diagnosticId\`), INDEX \`IDX_e7ce58588e702347a7ed2944d3\` (\`injuryId\`), PRIMARY KEY (\`diagnosticId\`, \`injuryId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnostic_symptom\` (\`diagnosticId\` varchar(36) NOT NULL, \`symptomId\` varchar(36) NOT NULL, INDEX \`IDX_bfd44cd63eb305ecd1139fbfe9\` (\`diagnosticId\`), INDEX \`IDX_c9f3d52bb68bed96298b07c459\` (\`symptomId\`), PRIMARY KEY (\`diagnosticId\`, \`symptomId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c9f3d52bb68bed96298b07c459\` ON \`diagnostic_symptom\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP COLUMN \`symptomId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD \`symptomId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD \`treatmentId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`, \`treatmentId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`treatmentId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_c9f3d52bb68bed96298b07c459\` ON \`diagnostic_symptom\` (\`symptomId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_ff086f000904326dcc02b385aa\` ON \`diagnostic_symptom\` (\`treatmentId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_illness\` ADD CONSTRAINT \`FK_f32b21d87e2d3fd3818a9a6b8dc\` FOREIGN KEY (\`diagnosticId\`) REFERENCES \`diagnostic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_illness\` ADD CONSTRAINT \`FK_11b29ff24aee8d72afe099219c1\` FOREIGN KEY (\`illnessId\`) REFERENCES \`illness\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_injury\` ADD CONSTRAINT \`FK_cdc9faa1ca20cae442728d76e01\` FOREIGN KEY (\`diagnosticId\`) REFERENCES \`diagnostic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_injury\` ADD CONSTRAINT \`FK_e7ce58588e702347a7ed2944d38\` FOREIGN KEY (\`injuryId\`) REFERENCES \`injury\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD CONSTRAINT \`FK_bfd44cd63eb305ecd1139fbfe95\` FOREIGN KEY (\`diagnosticId\`) REFERENCES \`diagnostic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD CONSTRAINT \`FK_c9f3d52bb68bed96298b07c4592\` FOREIGN KEY (\`symptomId\`) REFERENCES \`symptom\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD CONSTRAINT \`FK_ff086f000904326dcc02b385aa0\` FOREIGN KEY (\`treatmentId\`) REFERENCES \`treatment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP FOREIGN KEY \`FK_ff086f000904326dcc02b385aa0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP FOREIGN KEY \`FK_c9f3d52bb68bed96298b07c4592\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP FOREIGN KEY \`FK_bfd44cd63eb305ecd1139fbfe95\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_injury\` DROP FOREIGN KEY \`FK_e7ce58588e702347a7ed2944d38\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_injury\` DROP FOREIGN KEY \`FK_cdc9faa1ca20cae442728d76e01\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_illness\` DROP FOREIGN KEY \`FK_11b29ff24aee8d72afe099219c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_illness\` DROP FOREIGN KEY \`FK_f32b21d87e2d3fd3818a9a6b8dc\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ff086f000904326dcc02b385aa\` ON \`diagnostic_symptom\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c9f3d52bb68bed96298b07c459\` ON \`diagnostic_symptom\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`, \`treatmentId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`, \`treatmentId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP COLUMN \`treatmentId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP COLUMN \`symptomId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD \`symptomId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_c9f3d52bb68bed96298b07c459\` ON \`diagnostic_symptom\` (\`symptomId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_symptom\` ADD PRIMARY KEY (\`diagnosticId\`, \`symptomId\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c9f3d52bb68bed96298b07c459\` ON \`diagnostic_symptom\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bfd44cd63eb305ecd1139fbfe9\` ON \`diagnostic_symptom\``,
    );
    await queryRunner.query(`DROP TABLE \`diagnostic_symptom\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e7ce58588e702347a7ed2944d3\` ON \`diagnostic_injury\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cdc9faa1ca20cae442728d76e0\` ON \`diagnostic_injury\``,
    );
    await queryRunner.query(`DROP TABLE \`diagnostic_injury\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_11b29ff24aee8d72afe099219c\` ON \`diagnostic_illness\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f32b21d87e2d3fd3818a9a6b8d\` ON \`diagnostic_illness\``,
    );
    await queryRunner.query(`DROP TABLE \`diagnostic_illness\``);
    await queryRunner.query(`DROP TABLE \`injury\``);
    await queryRunner.query(`DROP TABLE \`illness\``);
    await queryRunner.query(`DROP TABLE \`pathology\``);
    await queryRunner.query(`DROP TABLE \`symptom\``);
    await queryRunner.query(`DROP TABLE \`treatment\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
