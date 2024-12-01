import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'medical_center',
})
export class MedicalCenterEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  instagramName: string;

  @ApiProperty()
  @Column({ nullable: true })
  twitterName: string;

  @ApiProperty()
  @Column({ nullable: true })
  facebookName: string;

  @ApiProperty()
  @Column({ nullable: true })
  tiktokName: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
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
  localPhone: string;

  @ApiProperty()
  @Column()
  mobilePhone: string;

  @ApiProperty()
  @Column({ type: 'text' })
  mission: string;

  @ApiProperty()
  @Column({ type: 'text' })
  vision: string;
}
