import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723568837269 implements MigrationInterface {
  name = 'Migration1723568837269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`installation\` (\`id\` varchar(36) NOT NULL, \`step\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`installation\``);
  }
}
