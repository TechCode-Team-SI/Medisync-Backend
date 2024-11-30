import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729262091813 implements MigrationInterface {
  name = 'Migration1729262091813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`statistics_metadata\` (\`id\` varchar(36) NOT NULL, \`label\` varchar(255) NOT NULL, \`type\` enum ('pie') NOT NULL, \`filteredByType\` enum ('none', 'specialty') NOT NULL, \`filter\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fieldQuestionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`statistics_metadata\` ADD CONSTRAINT \`FK_94f7698e85ff1b6ca7d8a64513e\` FOREIGN KEY (\`fieldQuestionId\`) REFERENCES \`field_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`statistics_metadata\` DROP FOREIGN KEY \`FK_94f7698e85ff1b6ca7d8a64513e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(`DROP TABLE \`statistics_metadata\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
