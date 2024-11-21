import { ApiProperty } from '@nestjs/swagger';
import { FileType } from 'src/files/domain/file';

export class TopSpecialties {
  @ApiProperty({
    type: String,
  })
  specialtyId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar?: FileType;

  @ApiProperty()
  requests: number;
}
