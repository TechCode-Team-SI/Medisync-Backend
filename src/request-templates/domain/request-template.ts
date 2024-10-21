import { ApiProperty } from '@nestjs/swagger';
import { RequestTemplateField } from './request-template-field';
import { Specialty } from 'src/specialties/domain/specialty';
import { Type } from 'class-transformer';

export class RequestTemplate {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ type: () => RequestTemplateField })
  fields: RequestTemplateField[];

  @ApiProperty({ type: () => Specialty })
  @Type(() => Specialty)
  specialties?: Specialty[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
