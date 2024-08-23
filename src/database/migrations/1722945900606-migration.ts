import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722945900606 implements MigrationInterface {
  name = 'Migration1722945900606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`employee_profile\` (\`id\` varchar(36) NOT NULL, \`dni\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`address\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_373701d8ebd68e444de0ddb0fe\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD UNIQUE INDEX \`IDX_373701d8ebd68e444de0ddb0fe\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD CONSTRAINT \`FK_373701d8ebd68e444de0ddb0fe7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP FOREIGN KEY \`FK_373701d8ebd68e444de0ddb0fe7\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP INDEX \`IDX_373701d8ebd68e444de0ddb0fe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\` (\`userId\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_373701d8ebd68e444de0ddb0fe\` ON \`employee_profile\``,
    );
    await queryRunner.query(`DROP TABLE \`employee_profile\``);
  }
}
