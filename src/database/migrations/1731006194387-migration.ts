import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731006194387 implements MigrationInterface {
  name = 'Migration1731006194387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_8a1b97c9c19270848632661aebc\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` DROP COLUMN \`ticketTagId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`room\` ADD \`isDisabled\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(`ALTER TABLE \`room\` DROP COLUMN \`isDisabled\``);
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD \`ticketTagId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_8a1b97c9c19270848632661aebc\` FOREIGN KEY (\`ticketTagId\`) REFERENCES \`ticket-type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
