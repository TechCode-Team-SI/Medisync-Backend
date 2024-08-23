import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723209673092 implements MigrationInterface {
  name = 'Migration1723209673092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`specialty\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isGroup\` tinyint NOT NULL DEFAULT 0, \`isPublic\` tinyint NOT NULL DEFAULT 1, \`isDisabled\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`imageId\` varchar(36) NULL, UNIQUE INDEX \`REL_ed108ac1bdfa21ea88a08010d8\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employee_specialty\` (\`specialtyId\` varchar(36) NOT NULL, \`employeeProfileId\` varchar(36) NOT NULL, INDEX \`IDX_2daf07afbf34f18eea21b27a9e\` (\`specialtyId\`), INDEX \`IDX_847fe43c893d56a6bea50d477e\` (\`employeeProfileId\`), PRIMARY KEY (\`specialtyId\`, \`employeeProfileId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD UNIQUE INDEX \`IDX_eb1f9f49512ba47b14c324f35d\` (\`dni\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`specialty\` ADD CONSTRAINT \`FK_ed108ac1bdfa21ea88a08010d8a\` FOREIGN KEY (\`imageId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_specialty\` ADD CONSTRAINT \`FK_2daf07afbf34f18eea21b27a9e9\` FOREIGN KEY (\`specialtyId\`) REFERENCES \`specialty\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_specialty\` ADD CONSTRAINT \`FK_847fe43c893d56a6bea50d477e6\` FOREIGN KEY (\`employeeProfileId\`) REFERENCES \`employee_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee_specialty\` DROP FOREIGN KEY \`FK_847fe43c893d56a6bea50d477e6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_specialty\` DROP FOREIGN KEY \`FK_2daf07afbf34f18eea21b27a9e9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`specialty\` DROP FOREIGN KEY \`FK_ed108ac1bdfa21ea88a08010d8a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP INDEX \`IDX_eb1f9f49512ba47b14c324f35d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_847fe43c893d56a6bea50d477e\` ON \`employee_specialty\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2daf07afbf34f18eea21b27a9e\` ON \`employee_specialty\``,
    );
    await queryRunner.query(`DROP TABLE \`employee_specialty\``);
    await queryRunner.query(
      `DROP INDEX \`REL_ed108ac1bdfa21ea88a08010d8\` ON \`specialty\``,
    );
    await queryRunner.query(`DROP TABLE \`specialty\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\` (\`userId\`)`,
    );
  }
}
