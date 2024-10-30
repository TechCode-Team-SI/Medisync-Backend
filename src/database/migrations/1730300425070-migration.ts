import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1730300425070 implements MigrationInterface {
  name = 'Migration1730300425070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_dac6dd6247e44387d21cff5af12\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` CHANGE \`employeesId\` \`slotTime\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP COLUMN \`slotTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD \`slotTime\` int NOT NULL DEFAULT '30'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP COLUMN \`slotTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD \`slotTime\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` CHANGE \`slotTime\` \`employeesId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_dac6dd6247e44387d21cff5af12\` FOREIGN KEY (\`employeesId\`) REFERENCES \`employee_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
