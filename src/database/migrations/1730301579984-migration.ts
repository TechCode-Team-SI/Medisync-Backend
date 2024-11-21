import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1730301579984 implements MigrationInterface {
  name = 'Migration1730301579984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_patient\` ADD \`familyRelationship\` enum ('madre', 'padre', 'hijo', 'hija', 'hermano', 'hermana', 'abuela', 'abuelo', 'nieto', 'nieta', 'tía', 'tío', 'primo/a', 'sobrino', 'sobrina', 'yo') NOT NULL DEFAULT 'yo'`,
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
      `ALTER TABLE \`user_patient\` DROP COLUMN \`familyRelationship\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
