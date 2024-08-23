import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722876736164 implements MigrationInterface {
  name = 'Migration1722876736164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`session\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`session\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`session\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`session\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`session\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
  }
}
