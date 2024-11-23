import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import { RequestStatusEnum } from '../requests.enum';
import { genderEnum } from 'src/employee-profiles/employee-profiles.enum';

export class RequestFormatted {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  patient: Patient;

  @ApiProperty()
  createdBy: Creator;

  @ApiProperty()
  requestedMedic?: Medic;

  @ApiProperty()
  referredBy: ReferredByMedic;

  @ApiPropertyOptional()
  requestedSpecialty: Specialty;

  @ApiPropertyOptional()
  referredContent?: string;

  @ApiProperty()
  appointmentHour: string;

  @ApiProperty()
  status: RequestStatusEnum;

  @ApiProperty()
  fields: (TextField | SelectionField)[];

  @ApiProperty()
  createdAt: Date;
}

type Patient = {
  fullName: string;
  dni: string;
  address: string;
  gender: genderEnum;
  birthday: Date;
};

type Creator = {
  fullName: string;
  id: string;
};

type Medic = {
  fullName: string;
};

type ReferredByMedic = {
  fullName: string;
};

type Specialty = {
  name: string;
};

export type TextField = {
  order: number;
  value: string;
  label: string;
  description?: string | null;
  type: FieldQuestionTypeEnum;
  isRequired: boolean;
};

export type SelectionField = {
  order: number;
  label: string;
  description?: string | null;
  type: FieldQuestionTypeEnum;
  isRequired: boolean;
  selectionConfig: {
    isMultiple: boolean;
  };
  selections: {
    id: string;
    value: string;
    isSelected: boolean;
  }[];
};
