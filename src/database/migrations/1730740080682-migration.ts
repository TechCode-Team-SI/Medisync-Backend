import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1730740080682 implements MigrationInterface {
  name = 'Migration1730740080682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_template\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`description\``);
    await queryRunner.query(
      `ALTER TABLE \`request_template\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
