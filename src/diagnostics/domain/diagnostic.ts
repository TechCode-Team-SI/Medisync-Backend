import { ApiProperty } from '@nestjs/swagger';
import { Specialty } from 'src/specialties/domain/specialty';
import { User } from 'src/users/domain/user';
import { Request } from 'src/requests/domain/request';
import { Illness } from 'src/illnesses/domain/illness';
import { Injury } from 'src/injuries/domain/injury';
import { Symptom } from 'src/symptoms/domain/symptom';
import { Treatment } from 'src/treatments/domain/treatment';

export class Diagnostic {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: User })
  madeBy: User;

  @ApiProperty({ type: Request })
  request: Request;

  @ApiProperty({ type: Specialty })
  specialty: Specialty;

  @ApiProperty({ type: Illness, isArray: true })
  illnesses: Illness[];

  @ApiProperty({ type: Injury, isArray: true })
  injuries: Injury[];

  @ApiProperty({ type: Symptom, isArray: true })
  symptoms: Symptom[];

  @ApiProperty({ type: Treatment, isArray: true })
  treatments: Treatment[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
