import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724892231819 implements MigrationInterface {
  name = 'Migration1724892231819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a254ce73a1b207f25bf6d7c5b4\` ON \`rating\``,
    );
    await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`review\``);
    await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD \`review\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_a254ce73a1b207f25bf6d7c5b4\` ON \`rating\` (\`requestId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
