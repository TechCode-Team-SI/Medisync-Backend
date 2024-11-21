import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ArticleEntity } from 'src/articles/infrastructure/persistence/relational/entities/article.entity';
import { ConfirmEmailTokenEntity } from 'src/auth/infrastructure/persistence/relational/entities/confirm-email-token.entity';
import { PasswordTokenEntity } from 'src/auth/infrastructure/persistence/relational/entities/password-token.entity';
import { EmployeeProfileEntity } from 'src/employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { UserPatientEntity } from 'src/user-patients/infrastructure/persistence/relational/entities/user-patient.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Column({ type: String, unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @Column({ type: String })
  fullName: string;

  @ApiProperty({
    type: () => FileEntity,
  })
  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  photo?: FileEntity | null;

  @ApiProperty({
    type: () => RoleEntity,
  })
  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'user_roles' })
  roles?: RoleEntity[] | null;

  @ApiProperty()
  @OneToMany(() => ArticleEntity, (article) => article.updatedBy)
  articles: ArticleEntity[];

  @ApiProperty()
  @OneToMany(() => PasswordTokenEntity, (passwordToken) => passwordToken.email)
  passwordTokens: PasswordTokenEntity[];

  @ApiProperty()
  @OneToMany(
    () => ConfirmEmailTokenEntity,
    (confirmEmailToken) => confirmEmailToken.email,
  )
  confirmEmailTokens: ConfirmEmailTokenEntity[];

  @ApiProperty()
  @OneToOne(
    () => EmployeeProfileEntity,
    (employeeProfile) => employeeProfile.user,
    { cascade: true },
  )
  employeeProfile?: EmployeeProfileEntity;

  @ApiProperty()
  @OneToMany(() => UserPatientEntity, (userPatient) => userPatient.user, {
    cascade: ['insert', 'update'],
  })
  userPatients?: UserPatientEntity[] | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
