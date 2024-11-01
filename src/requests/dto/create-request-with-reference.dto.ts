import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRequestDto } from './create-request.dto';

export class CreateRequestWithReferenceDto extends CreateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  referredContent?: string;
}
