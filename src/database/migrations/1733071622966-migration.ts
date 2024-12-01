import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1733071622966 implements MigrationInterface {
  name = 'Migration1733071622966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`mission\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`mission\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`vision\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`vision\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`vision\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`vision\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`mission\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`mission\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
