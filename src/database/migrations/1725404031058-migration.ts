import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725404031058 implements MigrationInterface {
  name = 'Migration1725404031058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`field_question\` ADD UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` (\`slug\`)`,
    );
    await queryRunner.query(`CREATE VIEW \`top_weekdays_all_time_entity\` AS 
  select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests 
  from request 
  where (request.status <> 'cancelled') 
  group by WEEKDAY(request.createdAt) 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_weekdays_all_time_entity',
        "select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests \n  from request \n  where (request.status <> 'cancelled') \n  group by WEEKDAY(request.createdAt) \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_weekdays_current_year_entity\` AS 
  select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests 
  from request 
  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now()))
  group by WEEKDAY(request.createdAt) 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_weekdays_current_year_entity',
        "select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests \n  from request \n  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now()))\n  group by WEEKDAY(request.createdAt) \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_weekdays_current_month_entity\` AS 
  select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests 
  from request 
  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))
  group by WEEKDAY(request.createdAt) 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_weekdays_current_month_entity',
        "select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests \n  from request \n  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))\n  group by WEEKDAY(request.createdAt) \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_weekdays_current_day_entity\` AS 
  select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests 
  from request 
  where (request.status <> 'cancelled') and  Date(request.createdAt)=Curdate()
  group by WEEKDAY(request.createdAt) 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_weekdays_current_day_entity',
        "select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests \n  from request \n  where (request.status <> 'cancelled') and  Date(request.createdAt)=Curdate()\n  group by WEEKDAY(request.createdAt) \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_specialties_all_time_entity\` AS 
select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests 
  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) 
  where (request.status <> 'cancelled') 
  group by request.requestedSpecialtyId 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_specialties_all_time_entity',
        "select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests \n  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) \n  where (request.status <> 'cancelled') \n  group by request.requestedSpecialtyId \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_specialties_current_year_entity\` AS 
select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests 
  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) 
  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now()))
  group by request.requestedSpecialtyId 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_specialties_current_year_entity',
        "select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests \n  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) \n  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now()))\n  group by request.requestedSpecialtyId \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_specialties_current_month_entity\` AS 
select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests 
  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) 
  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))
  group by request.requestedSpecialtyId 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_specialties_current_month_entity',
        "select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests \n  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) \n  where (request.status <> 'cancelled') and (year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))\n  group by request.requestedSpecialtyId \n  order by count(request.id);",
      ],
    );
    await queryRunner.query(`CREATE VIEW \`top_specialties_current_day_entity\` AS 
select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests 
  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) 
  where (request.status <> 'cancelled') and  Date(request.createdAt)=Curdate()
  group by request.requestedSpecialtyId 
  order by count(request.id);
`);
    await queryRunner.query(
      `INSERT INTO \`api\`.\`typeorm_metadata\`(\`database\`, \`schema\`, \`table\`, \`type\`, \`name\`, \`value\`) VALUES (DEFAULT, ?, DEFAULT, ?, ?, ?)`,
      [
        'api',
        'VIEW',
        'top_specialties_current_day_entity',
        "select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests \n  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) \n  where (request.status <> 'cancelled') and  Date(request.createdAt)=Curdate()\n  group by request.requestedSpecialtyId \n  order by count(request.id);",
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_specialties_current_day_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_specialties_current_day_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_specialties_current_month_entity', 'api'],
    );
    await queryRunner.query(
      `DROP VIEW \`top_specialties_current_month_entity\``,
    );
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_specialties_current_year_entity', 'api'],
    );
    await queryRunner.query(
      `DROP VIEW \`top_specialties_current_year_entity\``,
    );
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_specialties_all_time_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_specialties_all_time_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_weekdays_current_day_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_weekdays_current_day_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_weekdays_current_month_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_weekdays_current_month_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_weekdays_current_year_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_weekdays_current_year_entity\``);
    await queryRunner.query(
      `DELETE FROM \`api\`.\`typeorm_metadata\` WHERE \`type\` = ? AND \`name\` = ? AND \`schema\` = ?`,
      ['VIEW', 'top_weekdays_all_time_entity', 'api'],
    );
    await queryRunner.query(`DROP VIEW \`top_weekdays_all_time_entity\``);
    await queryRunner.query(
      `ALTER TABLE \`field_question\` DROP INDEX \`IDX_30b498d38d1b4b7f7768d08f02\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_30b498d38d1b4b7f7768d08f02\` ON \`field_question\` (\`slug\`)`,
    );
  }
}
