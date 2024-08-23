import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723721376772 implements MigrationInterface {
  name = 'Migration1723721376772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` CHANGE \`description\` \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`field_question\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`,
    );
  }
}
