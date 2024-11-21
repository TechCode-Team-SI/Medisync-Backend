import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728580849119 implements MigrationInterface {
  name = 'Migration1728580849119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_patient\` (\`id\` varchar(36) NOT NULL, \`gender\` enum ('M', 'F') NOT NULL DEFAULT 'M', \`dni\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_1fe6d4727b947c8089faf153ea\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_patient\` ADD CONSTRAINT \`FK_e941779e099150c0ec0fd2f6093\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_patient\` DROP FOREIGN KEY \`FK_e941779e099150c0ec0fd2f6093\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1fe6d4727b947c8089faf153ea\` ON \`user_patient\``,
    );
    await queryRunner.query(`DROP TABLE \`user_patient\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
