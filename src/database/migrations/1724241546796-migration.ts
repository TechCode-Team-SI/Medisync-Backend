import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724241546796 implements MigrationInterface {
  name = 'Migration1724241546796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_1dcb30021f1d962ec580f674d6c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_1dcb30021f1d962ec580f674d6c\` FOREIGN KEY (\`requestedMedicId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_1dcb30021f1d962ec580f674d6c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_1dcb30021f1d962ec580f674d6c\` FOREIGN KEY (\`requestedMedicId\`) REFERENCES \`employee_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
