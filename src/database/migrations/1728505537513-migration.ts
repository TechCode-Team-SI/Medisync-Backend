import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728505537513 implements MigrationInterface {
  name = 'Migration1728505537513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`instagramName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`twitterName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`facebookName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`tiktokName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` ADD \`email\` varchar(255) NOT NULL`,
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
      `ALTER TABLE \`medical_center\` DROP COLUMN \`email\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`tiktokName\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`facebookName\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`twitterName\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` DROP COLUMN \`instagramName\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
