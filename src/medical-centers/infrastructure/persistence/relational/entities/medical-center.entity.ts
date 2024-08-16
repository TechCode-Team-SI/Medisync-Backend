import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'medical_center',
})
export class MedicalCenterEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  municipality: string;

  @ApiProperty()
  @Column()
  parish: string;

  @ApiProperty()
  @Column()
  local_phone: string;

  @ApiProperty()
  @Column()
  mobile_phone: string;

  @ApiProperty()
  @Column()
  mission: string;

  @ApiProperty()
  @Column()
  vision: string;
}
