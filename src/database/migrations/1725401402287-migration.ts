import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725401402287 implements MigrationInterface {
  name = 'Migration1725401402287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(`CREATE VIEW \`top_medics_current_year_entity\` AS 
  select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests 
  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) 
  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now()))
  group by request.requestedMedicId 
  order by count(request.id)
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_medics_current_year_entity',
        "select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests \n  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) \n  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now()))\n  group by request.requestedMedicId \n  order by count(request.id)",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_medics_current_month_entity\` AS 
  select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests 
  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) 
  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))
  group by request.requestedMedicId 
  order by count(request.id)
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_medics_current_month_entity',
        "select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests \n  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) \n  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))\n  group by request.requestedMedicId \n  order by count(request.id)",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_medics_current_day_entity\` AS 
  select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests 
  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) 
  where (request.status <> 'cancelled') and  Date(request.createdAt)=Curdate()
  group by request.requestedMedicId 
  order by count(request.id)
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_medics_current_day_entity',
        "select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests \n  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) \n  where (request.status <> 'cancelled') and  Date(request.createdAt)=Curdate()\n  group by request.requestedMedicId \n  order by count(request.id)",
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_medics_current_day_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_medics_current_day_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_medics_current_month_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_medics_current_month_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_medics_current_year_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_medics_current_year_entity\``);
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
