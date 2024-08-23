import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723893266360 implements MigrationInterface {
  name = 'Migration1723893266360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value\` CHANGE \`value\` \`value\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_value\` CHANGE \`value\` \`value\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
