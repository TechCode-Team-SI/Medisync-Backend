import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722711674908 implements MigrationInterface {
  name = 'Migration1722711674908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`article\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`imageId\` varchar(36) NULL, \`updatedById\` varchar(36) NULL, UNIQUE INDEX \`REL_9e8730599dfbfa1e2ae6225b95\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_9e8730599dfbfa1e2ae6225b95e\` FOREIGN KEY (\`imageId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_c6ae1a67ee0dce0465a231e4bf1\` FOREIGN KEY (\`updatedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_c6ae1a67ee0dce0465a231e4bf1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_9e8730599dfbfa1e2ae6225b95e\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_9e8730599dfbfa1e2ae6225b95\` ON \`article\``,
    );
    await queryRunner.query(`DROP TABLE \`article\``);
  }
}
