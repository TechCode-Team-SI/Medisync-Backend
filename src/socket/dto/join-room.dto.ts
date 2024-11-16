import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinSocketRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
