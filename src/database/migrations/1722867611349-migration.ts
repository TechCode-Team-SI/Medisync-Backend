import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722867611349 implements MigrationInterface {
  name = 'Migration1722867611349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`file\` (\`id\` varchar(36) NOT NULL, \`path\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`id\` varchar(36) NOT NULL, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_3379e3b123dac5ec10734b8cc8\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`slug\` varchar(255) NOT NULL, \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_35c9b140caaf6da09cfabb0d67\` (\`slug\`), UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`article\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`imageId\` varchar(36) NULL, \`updatedById\` varchar(36) NULL, UNIQUE INDEX \`REL_9e8730599dfbfa1e2ae6225b95\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`confirm_email_token\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiresAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_a37edcf5d2a1a52bb8f6f99c82\` (\`email\`, \`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`password_token\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiresAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_dab18a649a7387582884b8371b\` (\`email\`, \`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`fullName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`photoId\` varchar(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_75e2be4ce11d447ef43be0e374\` (\`photoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hash\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` varchar(36) NULL, INDEX \`IDX_3d2f174ef04fb312fdebd0ddc5\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`permission_roles\` (\`permissionId\` varchar(36) NOT NULL, \`roleId\` varchar(36) NOT NULL, INDEX \`IDX_86f6c7d1a377b78cef67a3c3d2\` (\`permissionId\`), INDEX \`IDX_2ed76a7ef2fa565d019403a24f\` (\`roleId\`), PRIMARY KEY (\`permissionId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles\` (\`roleId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_86033897c009fcca8b6505d6be\` (\`roleId\`), INDEX \`IDX_472b25323af01488f1f66a06b6\` (\`userId\`), PRIMARY KEY (\`roleId\`, \`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_9e8730599dfbfa1e2ae6225b95e\` FOREIGN KEY (\`imageId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_c6ae1a67ee0dce0465a231e4bf1\` FOREIGN KEY (\`updatedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`confirm_email_token\` ADD CONSTRAINT \`FK_af3aea1c5f9f8ab5e4cb602d6d4\` FOREIGN KEY (\`email\`) REFERENCES \`user\`(\`email\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` ADD CONSTRAINT \`FK_8191b7bec1971a7d8365be03d3d\` FOREIGN KEY (\`email\`) REFERENCES \`user\`(\`email\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_75e2be4ce11d447ef43be0e374f\` FOREIGN KEY (\`photoId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` ADD CONSTRAINT \`FK_3d2f174ef04fb312fdebd0ddc53\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_roles\` ADD CONSTRAINT \`FK_86f6c7d1a377b78cef67a3c3d23\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_roles\` ADD CONSTRAINT \`FK_2ed76a7ef2fa565d019403a24f9\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_86033897c009fcca8b6505d6be2\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_472b25323af01488f1f66a06b67\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_472b25323af01488f1f66a06b67\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_86033897c009fcca8b6505d6be2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_roles\` DROP FOREIGN KEY \`FK_2ed76a7ef2fa565d019403a24f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission_roles\` DROP FOREIGN KEY \`FK_86f6c7d1a377b78cef67a3c3d23\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_3d2f174ef04fb312fdebd0ddc53\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_75e2be4ce11d447ef43be0e374f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`password_token\` DROP FOREIGN KEY \`FK_8191b7bec1971a7d8365be03d3d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`confirm_email_token\` DROP FOREIGN KEY \`FK_af3aea1c5f9f8ab5e4cb602d6d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_c6ae1a67ee0dce0465a231e4bf1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_9e8730599dfbfa1e2ae6225b95e\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_472b25323af01488f1f66a06b6\` ON \`user_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_86033897c009fcca8b6505d6be\` ON \`user_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`user_roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_2ed76a7ef2fa565d019403a24f\` ON \`permission_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_86f6c7d1a377b78cef67a3c3d2\` ON \`permission_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`permission_roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3d2f174ef04fb312fdebd0ddc5\` ON \`session\``,
    );
    await queryRunner.query(`DROP TABLE \`session\``);
    await queryRunner.query(
      `DROP INDEX \`REL_75e2be4ce11d447ef43be0e374\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_dab18a649a7387582884b8371b\` ON \`password_token\``,
    );
    await queryRunner.query(`DROP TABLE \`password_token\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a37edcf5d2a1a52bb8f6f99c82\` ON \`confirm_email_token\``,
    );
    await queryRunner.query(`DROP TABLE \`confirm_email_token\``);
    await queryRunner.query(
      `DROP INDEX \`REL_9e8730599dfbfa1e2ae6225b95\` ON \`article\``,
    );
    await queryRunner.query(`DROP TABLE \`article\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_35c9b140caaf6da09cfabb0d67\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3379e3b123dac5ec10734b8cc8\` ON \`permission\``,
    );
    await queryRunner.query(`DROP TABLE \`permission\``);
    await queryRunner.query(`DROP TABLE \`file\``);
  }
}
