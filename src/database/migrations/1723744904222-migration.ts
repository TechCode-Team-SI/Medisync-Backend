import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723744904222 implements MigrationInterface {
  name = 'Migration1723744904222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP FOREIGN KEY \`FK_ceae8e79f35f151a597b57e0859\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ceae8e79f35f151a597b57e085\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_ceae8e79f35f151a597b57e085\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`selection_configuration\` (\`id\` varchar(36) NOT NULL, \`field_question_id\` varchar(36) NULL, UNIQUE INDEX \`REL_9b137b31ecd3a8fc86b93b424b\` (\`field_question_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`selection\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(255) NOT NULL, \`field_question_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`field_question_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`selection_configuration\` ADD CONSTRAINT \`FK_9b137b31ecd3a8fc86b93b424ba\` FOREIGN KEY (\`field_question_id\`) REFERENCES \`field_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`selection\` ADD CONSTRAINT \`FK_46bae81ccd4d9cc7493546c0780\` FOREIGN KEY (\`field_question_id\`) REFERENCES \`field_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`selection\` DROP FOREIGN KEY \`FK_46bae81ccd4d9cc7493546c0780\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`selection_configuration\` DROP FOREIGN KEY \`FK_9b137b31ecd3a8fc86b93b424ba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`field_question_id\` varchar(36) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`selection\``);
    await queryRunner.query(
      `DROP INDEX \`REL_9b137b31ecd3a8fc86b93b424b\` ON \`selection_configuration\``,
    );
    await queryRunner.query(`DROP TABLE \`selection_configuration\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_ceae8e79f35f151a597b57e085\` ON \`field_question\` (\`field_question_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_ceae8e79f35f151a597b57e085\` ON \`field_question\` (\`field_question_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD CONSTRAINT \`FK_ceae8e79f35f151a597b57e0859\` FOREIGN KEY (\`field_question_id\`) REFERENCES \`field_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
