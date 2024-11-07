import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1730988847901 implements MigrationInterface {
  name = 'Migration1730988847901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP FOREIGN KEY \`FK_0279c0a137e83c70dbeb4f1622d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` DROP COLUMN \`scheduleId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`agenda\` ADD \`from\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agenda\` ADD \`to\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`agenda\` ADD \`slotTime\` int NOT NULL DEFAULT '30'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(`ALTER TABLE \`agenda\` DROP COLUMN \`slotTime\``);
    await queryRunner.query(`ALTER TABLE \`agenda\` DROP COLUMN \`to\``);
    await queryRunner.query(`ALTER TABLE \`agenda\` DROP COLUMN \`from\``);
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD \`scheduleId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee_profile\` ADD CONSTRAINT \`FK_0279c0a137e83c70dbeb4f1622d\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
