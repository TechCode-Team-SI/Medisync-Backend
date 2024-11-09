import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731186759631 implements MigrationInterface {
  name = 'Migration1731186759631';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_8047d1901f9c7f282310058deb7\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_8047d1901f9c7f282310058deb\` ON \`room\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` DROP COLUMN \`employeeProfileId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`roomId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD CONSTRAINT \`FK_f3020821fed0668dc988ff0eb92\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP FOREIGN KEY \`FK_f3020821fed0668dc988ff0eb92\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`roomId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` ADD \`employeeProfileId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_8047d1901f9c7f282310058deb\` ON \`room\` (\`employeeProfileId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` ADD CONSTRAINT \`FK_8047d1901f9c7f282310058deb7\` FOREIGN KEY (\`employeeProfileId\`) REFERENCES \`employee_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
