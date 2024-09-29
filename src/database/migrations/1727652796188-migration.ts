import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727652796188 implements MigrationInterface {
  name = 'Migration1727652796188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`MPPS\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`CML\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`gender\` enum ('M', 'F') NOT NULL DEFAULT 'M'`,
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
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`gender\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`CML\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`MPPS\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
