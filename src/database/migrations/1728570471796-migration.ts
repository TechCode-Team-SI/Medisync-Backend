import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728570471796 implements MigrationInterface {
  name = 'Migration1728570471796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_4f323df9606c960009e3345bbef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD UNIQUE INDEX \`IDX_4f323df9606c960009e3345bbe\` (\`ratedBy\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_4f323df9606c960009e3345bbe\` ON \`rating\` (\`ratedBy\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_4f323df9606c960009e3345bbef\` FOREIGN KEY (\`ratedBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_4f323df9606c960009e3345bbef\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_4f323df9606c960009e3345bbe\` ON \`rating\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP INDEX \`IDX_4f323df9606c960009e3345bbe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_4f323df9606c960009e3345bbef\` FOREIGN KEY (\`ratedBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
