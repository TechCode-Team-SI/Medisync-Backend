import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722864106367 implements MigrationInterface {
  name = 'Migration1722864106367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role\` ADD \`slug\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_a37edcf5d2a1a52bb8f6f99c82\` ON \`confirm_email_token\` (\`email\`, \`code\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_dab18a649a7387582884b8371b\` ON \`password_token\` (\`email\`, \`code\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_dab18a649a7387582884b8371b\` ON \`password_token\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a37edcf5d2a1a52bb8f6f99c82\` ON \`confirm_email_token\``,
    );
    await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`slug\``);
  }
}
