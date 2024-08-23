import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724251318549 implements MigrationInterface {
  name = 'Migration1724251318549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`instructions\` (\`id\` varchar(36) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`madeById\` varchar(36) NULL, \`specialtyId\` varchar(36) NULL, \`requestId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`diagnostic\` (\`id\` varchar(36) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`madeById\` varchar(36) NULL, \`specialtyId\` varchar(36) NULL, \`requestId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`instructions\` ADD CONSTRAINT \`FK_66d5eef56bdab5515190c03b09f\` FOREIGN KEY (\`madeById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`instructions\` ADD CONSTRAINT \`FK_20ccf52fdae16f87d92b127b370\` FOREIGN KEY (\`specialtyId\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`instructions\` ADD CONSTRAINT \`FK_ec3803a51be21a5ec9d48d0a088\` FOREIGN KEY (\`requestId\`) REFERENCES \`request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic\` ADD CONSTRAINT \`FK_d0701d37dfc2f56164a26aaefeb\` FOREIGN KEY (\`madeById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic\` ADD CONSTRAINT \`FK_81834804fcd16a1c7358a5676e9\` FOREIGN KEY (\`specialtyId\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic\` ADD CONSTRAINT \`FK_64f95392cb6165d1be3b614e403\` FOREIGN KEY (\`requestId\`) REFERENCES \`request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diagnostic\` DROP FOREIGN KEY \`FK_64f95392cb6165d1be3b614e403\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic\` DROP FOREIGN KEY \`FK_81834804fcd16a1c7358a5676e9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diagnostic\` DROP FOREIGN KEY \`FK_d0701d37dfc2f56164a26aaefeb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`instructions\` DROP FOREIGN KEY \`FK_ec3803a51be21a5ec9d48d0a088\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`instructions\` DROP FOREIGN KEY \`FK_20ccf52fdae16f87d92b127b370\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`instructions\` DROP FOREIGN KEY \`FK_66d5eef56bdab5515190c03b09f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(`DROP TABLE \`diagnostic\``);
    await queryRunner.query(`DROP TABLE \`instructions\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
