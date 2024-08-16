import { ApiProperty } from '@nestjs/swagger';
import { RequestTemplateField } from './request-template-field';

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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
