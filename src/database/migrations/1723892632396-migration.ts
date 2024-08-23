import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723892632396 implements MigrationInterface {
  name = 'Migration1723892632396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`request_value\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(255) NOT NULL, \`requestId\` varchar(36) NULL, \`fieldQuestionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`request\` (\`id\` varchar(36) NOT NULL, \`patientFullName\` varchar(255) NOT NULL, \`patientDNI\` varchar(255) NOT NULL, \`patientAddress\` varchar(255) NOT NULL, \`appointmentHour\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`requestedMedicId\` varchar(36) NULL, \`requestedSpecialtyId\` varchar(36) NULL, \`requestTemplateId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`request_value_selection\` (\`requestValueId\` varchar(36) NOT NULL, \`selectionId\` varchar(36) NOT NULL, INDEX \`IDX_fd1ab1b33deeba55350ce9722e\` (\`requestValueId\`), INDEX \`IDX_0f5c2dad422c62234d45d1a4a3\` (\`selectionId\`), PRIMARY KEY (\`requestValueId\`, \`selectionId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value\` ADD CONSTRAINT \`FK_f7b040e8375bd0d48efb13aaca1\` FOREIGN KEY (\`requestId\`) REFERENCES \`request\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value\` ADD CONSTRAINT \`FK_e8acaf6816506d849d8e32cbf1a\` FOREIGN KEY (\`fieldQuestionId\`) REFERENCES \`field_question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_1dcb30021f1d962ec580f674d6c\` FOREIGN KEY (\`requestedMedicId\`) REFERENCES \`employee_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_ad98e1b184191c5e8e86a81f409\` FOREIGN KEY (\`requestedSpecialtyId\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_a7b06a8336c3c3e898fb45a812b\` FOREIGN KEY (\`requestTemplateId\`) REFERENCES \`request_template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value_selection\` ADD CONSTRAINT \`FK_fd1ab1b33deeba55350ce9722e0\` FOREIGN KEY (\`requestValueId\`) REFERENCES \`request_value\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value_selection\` ADD CONSTRAINT \`FK_0f5c2dad422c62234d45d1a4a36\` FOREIGN KEY (\`selectionId\`) REFERENCES \`selection\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request_value_selection\` DROP FOREIGN KEY \`FK_0f5c2dad422c62234d45d1a4a36\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value_selection\` DROP FOREIGN KEY \`FK_fd1ab1b33deeba55350ce9722e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_a7b06a8336c3c3e898fb45a812b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_ad98e1b184191c5e8e86a81f409\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_1dcb30021f1d962ec580f674d6c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value\` DROP FOREIGN KEY \`FK_e8acaf6816506d849d8e32cbf1a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request_value\` DROP FOREIGN KEY \`FK_f7b040e8375bd0d48efb13aaca1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0f5c2dad422c62234d45d1a4a3\` ON \`request_value_selection\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fd1ab1b33deeba55350ce9722e\` ON \`request_value_selection\``,
    );
    await queryRunner.query(`DROP TABLE \`request_value_selection\``);
    await queryRunner.query(`DROP TABLE \`request\``);
    await queryRunner.query(`DROP TABLE \`request_value\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
