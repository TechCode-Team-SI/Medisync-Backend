import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestIdDto } from 'src/requests/dto/request-id.dto';
import { UserIdDto } from 'src/users/dto/user-id.dto';

export class CreateRatingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stars: number;

  @ApiProperty({ type: () => UserIdDto })
  @IsNotEmpty()
  @Type(() => UserIdDto)
  ratingBy: UserIdDto;

  @ApiProperty({ type: () => RequestIdDto })
  @IsNotEmpty()
  @Type(() => RequestIdDto)
  requestId: RequestIdDto;
}
