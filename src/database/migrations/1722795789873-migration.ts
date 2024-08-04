import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722795789873 implements MigrationInterface {
  name = 'Migration1722795789873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`password_token\` DROP FOREIGN KEY \`FK_1f133431946966b4ebf884189a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` CHANGE \`emailId\` \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` ADD CONSTRAINT \`FK_a7e9d2b757ebfbdb8b7f57e98ca\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`password_token\` DROP FOREIGN KEY \`FK_a7e9d2b757ebfbdb8b7f57e98ca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` CHANGE \`userId\` \`emailId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` ADD CONSTRAINT \`FK_1f133431946966b4ebf884189a5\` FOREIGN KEY (\`emailId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
