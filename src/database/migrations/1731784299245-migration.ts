import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731784299245 implements MigrationInterface {
  name = 'Migration1731784299245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`article_category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b0a808c4235154154a1ccb2d79\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`article_article_category\` (\`articleId\` varchar(36) NOT NULL, \`articleCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_74baa1892e3dd3335b3006b320\` (\`articleId\`), INDEX \`IDX_1707da9081f4878f845bf892fe\` (\`articleCategoryId\`), PRIMARY KEY (\`articleId\`, \`articleCategoryId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_article_category\` ADD CONSTRAINT \`FK_74baa1892e3dd3335b3006b320b\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_article_category\` ADD CONSTRAINT \`FK_1707da9081f4878f845bf892fec\` FOREIGN KEY (\`articleCategoryId\`) REFERENCES \`article_category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article_article_category\` DROP FOREIGN KEY \`FK_1707da9081f4878f845bf892fec\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_article_category\` DROP FOREIGN KEY \`FK_74baa1892e3dd3335b3006b320b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1707da9081f4878f845bf892fe\` ON \`article_article_category\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_74baa1892e3dd3335b3006b320\` ON \`article_article_category\``,
    );
    await queryRunner.query(`DROP TABLE \`article_article_category\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b0a808c4235154154a1ccb2d79\` ON \`article_category\``,
    );
    await queryRunner.query(`DROP TABLE \`article_category\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
