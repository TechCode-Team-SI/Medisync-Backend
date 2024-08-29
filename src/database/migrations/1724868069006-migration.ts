import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724868069006 implements MigrationInterface {
  name = 'Migration1724868069006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`rating\` (\`id\` varchar(36) NOT NULL, \`stars\` int NOT NULL, \`review\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ratingBy\` varchar(36) NULL, \`requestId\` varchar(36) NULL, UNIQUE INDEX \`REL_a254ce73a1b207f25bf6d7c5b4\` (\`requestId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_32ab27579125d0ea00e63e17360\` FOREIGN KEY (\`ratingBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_32ab27579125d0ea00e63e17360\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_a254ce73a1b207f25bf6d7c5b4\` ON \`rating\``,
    );
    await queryRunner.query(`DROP TABLE \`rating\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
