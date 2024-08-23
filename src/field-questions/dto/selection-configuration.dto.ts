import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SelectionConfigurationDto {
  @ApiProperty()
  @IsBoolean()
  isMultiple: boolean;
}
