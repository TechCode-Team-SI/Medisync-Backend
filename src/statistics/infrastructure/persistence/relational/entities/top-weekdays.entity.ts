import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn, ViewEntity } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

const viewExpression = (condition?: string) => `
  select WEEKDAY(request.createdAt) as weekday, count(request.id) AS requests 
  from request 
  where (request.status <> 'cancelled') ${condition ? `and ${condition}` : ''}
  group by WEEKDAY(request.createdAt) 
  order by count(request.id);
`;

export class TopWeekdaysEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  weekday: string;

  @ApiProperty()
  @ViewColumn()
  requests: number;
}

@ViewEntity({
  expression: viewExpression(),
})
export class TopWeekdaysAllTimeEntity extends TopWeekdaysEntity {}

@ViewEntity({
  expression: viewExpression('(year(request.createdAt) = year(now()))'),
})
export class TopWeekdaysCurrentYearEntity extends TopWeekdaysEntity {}

@ViewEntity({
  expression: viewExpression(
    '(year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))',
  ),
})
export class TopWeekdaysCurrentMonthEntity extends TopWeekdaysEntity {}

@ViewEntity({
  expression: viewExpression(' Date(request.createdAt)=Curdate()'),
})
export class TopWeekdaysCurrentDayEntity extends TopWeekdaysEntity {}
