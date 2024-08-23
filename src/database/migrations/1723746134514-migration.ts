import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723746134514 implements MigrationInterface {
  name = 'Migration1723746134514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`selection_configuration\` ADD \`isMultiple\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`selection_configuration\` DROP COLUMN \`isMultiple\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
