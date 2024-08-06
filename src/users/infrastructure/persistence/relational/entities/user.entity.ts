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
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ArticleEntity } from 'src/articles/infrastructure/persistence/relational/entities/article.entity';
import { ConfirmEmailTokenEntity } from 'src/auth/infrastructure/persistence/relational/entities/confirm-email-token.entity';
import { PasswordTokenEntity } from 'src/auth/infrastructure/persistence/relational/entities/password-token.entity';
import { EmployeeProfileEntity } from './employee-profile.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
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
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
