import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728580374154 implements MigrationInterface {
  name = 'Migration1728580374154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4f323df9606c960009e3345bbe\` ON \`rating\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` CHANGE \`email\` \`email\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medical_center\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_4f323df9606c960009e3345bbe\` ON \`rating\` (\`ratedBy\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
