import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732143413532 implements MigrationInterface {
  name = 'Migration1732143413532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD \`review\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`description\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statistics_metadata\` CHANGE \`type\` \`type\` enum ('tart', 'histogram') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`statistics_metadata\` CHANGE \`type\` \`type\` enum ('tart') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`review\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
