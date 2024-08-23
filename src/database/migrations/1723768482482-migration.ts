import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723768482482 implements MigrationInterface {
  name = 'Migration1723768482482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`request_template\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8b81745749ddc61e2cb66deadd\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`request_template_field\` (\`id\` varchar(36) NOT NULL, \`order\` int NOT NULL, \`request_template_id\` varchar(36) NULL, \`field_question_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_c814d33486f8c559404b2cf9b2\` (\`request_template_id\`, \`field_question_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_template_field\` ADD CONSTRAINT \`FK_37a93023af57afbed8a5e5c4988\` FOREIGN KEY (\`request_template_id\`) REFERENCES \`request_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_template_field\` ADD CONSTRAINT \`FK_25b5e03abf6982feb81045fcf58\` FOREIGN KEY (\`field_question_id\`) REFERENCES \`field_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_template_field\` DROP FOREIGN KEY \`FK_25b5e03abf6982feb81045fcf58\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_template_field\` DROP FOREIGN KEY \`FK_37a93023af57afbed8a5e5c4988\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c814d33486f8c559404b2cf9b2\` ON \`request_template_field\``,
    );
    await queryRunner.query(`DROP TABLE \`request_template_field\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8b81745749ddc61e2cb66deadd\` ON \`request_template\``,
    );
    await queryRunner.query(`DROP TABLE \`request_template\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
