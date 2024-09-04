import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725386824570 implements MigrationInterface {
  name = 'Migration1725386824570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(`CREATE VIEW \`top_medics_all_time_entity\` AS 
  select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests 
  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) 
  where (request.status <> 'cancelled') 
  group by request.requestedMedicId 
  order by count(request.id)
  `);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_medics_all_time_entity',
        "select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests \n  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) \n  where (request.status <> 'cancelled') \n  group by request.requestedMedicId \n  order by count(request.id)",
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_medics_all_time_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_medics_all_time_entity\``);
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
