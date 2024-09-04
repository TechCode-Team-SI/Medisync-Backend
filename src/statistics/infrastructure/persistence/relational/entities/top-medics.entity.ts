import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn, ViewEntity } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

const viewExpression = (condition?: string) => `
  select request.requestedMedicId AS medicId,user.fullName AS fullName,file.path AS avatar,count(request.id) AS requests 
  from ((request join user on((user.id = request.requestedMedicId))) left join file on((file.id = user.photoId))) 
  where (request.status <> 'cancelled') ${condition ? `and ${condition}` : ''}
  group by request.requestedMedicId 
  order by count(request.id)
`;

export class TopMedicsEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  medicId: string;

  @ApiProperty()
  @ViewColumn()
  fullName: string;

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
export class TopMedicsAllTimeEntity extends TopMedicsEntity {}

@ViewEntity({
  expression: viewExpression('(year(request.createdAt) = year(now()))'),
})
export class TopMedicsCurrentYearEntity extends TopMedicsEntity {}

@ViewEntity({
  expression: viewExpression(
    '(year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))',
  ),
})
export class TopMedicsCurrentMonthEntity extends TopMedicsEntity {}

@ViewEntity({
  expression: viewExpression(' Date(request.createdAt)=Curdate()'),
})
export class TopMedicsCurrentDayEntity extends TopMedicsEntity {}
