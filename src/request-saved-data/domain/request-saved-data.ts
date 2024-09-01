import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user';
import { Request } from 'src/requests/domain/request';
export class RequestSavedData {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Request })
  request: Request;

  @ApiProperty()
  alias: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
