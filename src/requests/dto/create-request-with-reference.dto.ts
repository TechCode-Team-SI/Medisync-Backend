import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRequestPrivateDto } from './create-request-private.dto';

export class CreateRequestWithReferenceDto extends CreateRequestPrivateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  referredContent?: string;
}
