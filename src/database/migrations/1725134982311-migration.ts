import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725134982311 implements MigrationInterface {
  name = 'Migration1725134982311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD \`referredContent\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD \`referredById\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_a8e82059e69e31cf4e3ba825490\` FOREIGN KEY (\`referredById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_a8e82059e69e31cf4e3ba825490\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP COLUMN \`referredById\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP COLUMN \`referredContent\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
