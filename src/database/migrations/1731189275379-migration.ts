import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731189275379 implements MigrationInterface {
  name = 'Migration1731189275379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`description\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` DROP COLUMN \`comment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` ADD \`comment\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD \`description\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` DROP COLUMN \`comment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket_comment\` ADD \`comment\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
