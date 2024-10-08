import { ApiProperty } from '@nestjs/swagger';

export class IsValidPassCodeResponseDto {
  @ApiProperty()
  valid: boolean;
}
