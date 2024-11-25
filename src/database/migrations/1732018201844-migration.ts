import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732018201844 implements MigrationInterface {
  name = 'Migration1732018201844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_a33607f1aa72d68c6d8df8aef1a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP COLUMN \`madeForId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD \`patientGender\` enum ('M', 'F') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD \`patientBirthday\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP COLUMN \`patientBirthday\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` DROP COLUMN \`patientGender\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD \`madeForId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`request\` ADD CONSTRAINT \`FK_a33607f1aa72d68c6d8df8aef1a\` FOREIGN KEY (\`madeForId\`) REFERENCES \`user_patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
