import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723732598606 implements MigrationInterface {
  name = 'Migration1723732598606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`slug\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`isRequired\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`label\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`slug\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`label\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`isRequired\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`isRequired\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`label\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`slug\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`label\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`isRequired\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`description\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`slug\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
