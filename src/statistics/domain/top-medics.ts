import { ApiProperty } from '@nestjs/swagger';
import { FileType } from 'src/files/domain/file';

export class TopMedics {
  @ApiProperty({
    type: String,
  })
  medicId: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  avatar?: FileType;

  @ApiProperty()
  requests: number;
}
