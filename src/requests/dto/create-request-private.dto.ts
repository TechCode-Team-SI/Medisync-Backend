import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { UserPatientIdDto } from 'src/user-patients/dto/user-patient-id.dto';
import { CreateRequestDto } from './create-request.dto';

export class CreateRequestPrivateDto extends CreateRequestDto {
  @ApiProperty({ type: () => UserPatientIdDto })
  @IsOptional()
  @Type(() => UserPatientIdDto)
  madeFor?: UserPatientIdDto | null;
}
