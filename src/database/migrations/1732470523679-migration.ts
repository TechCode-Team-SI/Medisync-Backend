import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732470523679 implements MigrationInterface {
  name = 'Migration1732470523679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnostic_pathology\` (\`diagnosticId\` varchar(36) NOT NULL, \`pathologyId\` varchar(36) NOT NULL, INDEX \`IDX_9f40135c5e75bc32a5808869c1\` (\`diagnosticId\`), INDEX \`IDX_2cd5de68eb6471e196b359ddca\` (\`pathologyId\`), PRIMARY KEY (\`diagnosticId\`, \`pathologyId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_pathology\` ADD CONSTRAINT \`FK_9f40135c5e75bc32a5808869c13\` FOREIGN KEY (\`diagnosticId\`) REFERENCES \`diagnostic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_pathology\` ADD CONSTRAINT \`FK_2cd5de68eb6471e196b359ddca9\` FOREIGN KEY (\`pathologyId\`) REFERENCES \`pathology\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_pathology\` DROP FOREIGN KEY \`FK_2cd5de68eb6471e196b359ddca9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic_pathology\` DROP FOREIGN KEY \`FK_9f40135c5e75bc32a5808869c13\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2cd5de68eb6471e196b359ddca\` ON \`diagnostic_pathology\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9f40135c5e75bc32a5808869c1\` ON \`diagnostic_pathology\``,
    );
    await queryRunner.query(`DROP TABLE \`diagnostic_pathology\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
