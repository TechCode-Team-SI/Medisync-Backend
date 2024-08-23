import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyPackagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  slugs: string[];
}
