import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user';
import { Request } from 'src/requests/domain/request';

export class Rating {
  @ApiProperty()
  review: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  stars: number;

  @ApiProperty({ type: () => User })
  ratedBy: User;

  @ApiProperty({ type: () => Request })
  request: Request;
}
