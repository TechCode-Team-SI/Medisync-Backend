import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailToken {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  expiresAt: Date;
}
