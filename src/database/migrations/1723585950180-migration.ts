import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723585950180 implements MigrationInterface {
  name = 'Migration1723585950180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`installation\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`installation\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`installation\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`installation\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`installation\` ADD \`id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`installation\` ADD PRIMARY KEY (\`id\`)`,
    );
  }
}
