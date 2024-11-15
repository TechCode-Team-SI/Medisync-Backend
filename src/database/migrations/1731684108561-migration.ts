import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731684108561 implements MigrationInterface {
  name = 'Migration1731684108561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`article_category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b0a808c4235154154a1ccb2d79\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b0a808c4235154154a1ccb2d79\` ON \`article_category\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD UNIQUE INDEX \`IDX_b0a808c4235154154a1ccb2d79\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`articleId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`id\`, \`articleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`articleCategoryId\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`id\`, \`articleId\`, \`articleCategoryId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`articleId\`, \`articleCategoryId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_231480421cd3ef1c3428001687\` ON \`article_category\` (\`articleId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_3e912d457120739539ae889a7f\` ON \`article_category\` (\`articleCategoryId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD CONSTRAINT \`FK_231480421cd3ef1c34280016871\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD CONSTRAINT \`FK_3e912d457120739539ae889a7fe\` FOREIGN KEY (\`articleCategoryId\`) REFERENCES \`article_category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP FOREIGN KEY \`FK_3e912d457120739539ae889a7fe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP FOREIGN KEY \`FK_231480421cd3ef1c34280016871\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3e912d457120739539ae889a7f\` ON \`article_category\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_231480421cd3ef1c3428001687\` ON \`article_category\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`id\`, \`articleId\`, \`articleCategoryId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`id\`, \`articleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`articleCategoryId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`articleId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP INDEX \`IDX_b0a808c4235154154a1ccb2d79\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` DROP COLUMN \`id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b0a808c4235154154a1ccb2d79\` ON \`article_category\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD \`id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_category\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b0a808c4235154154a1ccb2d79\` ON \`article_category\``,
    );
    await queryRunner.query(`DROP TABLE \`article_category\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
