import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn, ViewEntity } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

const viewExpression = (condition?: string) => `
select request.requestedSpecialtyId AS specialtyId,specialty.name AS name,file.path AS avatar,count(request.id) AS requests 
  from ((request join specialty on((specialty.id = request.requestedSpecialtyId))) left join file on((file.id = specialty.imageId))) 
  where (request.status <> 'cancelled') ${condition ? `and ${condition}` : ''}
  group by request.requestedSpecialtyId 
  order by count(request.id);
`;

export class TopSpecialtiesEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  specialtyId: string;

  @ApiProperty()
  @ViewColumn()
  name: string;

  @ApiProperty()
  @ViewColumn()
  avatar?: string;

  @ApiProperty()
  @ViewColumn()
  requests: number;
}

@ViewEntity({
  expression: viewExpression(),
})
export class TopSpecialtiesAllTimeEntity extends TopSpecialtiesEntity {}

@ViewEntity({
  expression: viewExpression('(year(request.createdAt) = year(now()))'),
})
export class TopSpecialtiesCurrentYearEntity extends TopSpecialtiesEntity {}

@ViewEntity({
  expression: viewExpression(
    '(year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))',
  ),
})
export class TopSpecialtiesCurrentMonthEntity extends TopSpecialtiesEntity {}

@ViewEntity({
  expression: viewExpression(' Date(request.createdAt)=Curdate()'),
})
export class TopSpecialtiesCurrentDayEntity extends TopSpecialtiesEntity {}
