import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724889986220 implements MigrationInterface {
  name = 'Migration1724889986220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_5f4c2949f879225b9eaadc1c6cb\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5f4c2949f879225b9eaadc1c6c\` ON \`request\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_5f4c2949f879225b9eaadc1c6c\` ON \`request\``,
    );
    await queryRunner.query(`ALTER TABLE \`request\` DROP COLUMN \`ratingId\``);
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD \`requestId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD UNIQUE INDEX \`IDX_a254ce73a1b207f25bf6d7c5b4\` (\`requestId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_a254ce73a1b207f25bf6d7c5b4\` ON \`rating\` (\`requestId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a254ce73a1b207f25bf6d7c5b45\` FOREIGN KEY (\`requestId\`) REFERENCES \`request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a254ce73a1b207f25bf6d7c5b45\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_a254ce73a1b207f25bf6d7c5b4\` ON \`rating\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` DROP INDEX \`IDX_a254ce73a1b207f25bf6d7c5b4\``,
    );
    await queryRunner.query(`ALTER TABLE \`rating\` DROP COLUMN \`requestId\``);
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD \`ratingId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_5f4c2949f879225b9eaadc1c6c\` ON \`request\` (\`ratingId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_5f4c2949f879225b9eaadc1c6c\` ON \`request\` (\`ratingId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_5f4c2949f879225b9eaadc1c6cb\` FOREIGN KEY (\`ratingId\`) REFERENCES \`rating\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
