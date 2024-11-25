import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732569268529 implements MigrationInterface {
  name = 'Migration1732569268529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_4f323df9606c960009e3345bbef\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_4f323df9606c960009e3345bbe\` ON \`rating\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`ratedBy\``);
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD \`ratedBy\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_4f323df9606c960009e3345bbe\` ON \`rating\` (\`ratedBy\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_4f323df9606c960009e3345bbef\` FOREIGN KEY (\`ratedBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
