import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionEntity } from 'src/permissions/infrastructure/persistence/relational/entities/permission.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ unique: true })
  slug: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    type: () => PermissionEntity,
  })
  @ManyToMany(() => PermissionEntity, { eager: true })
  @JoinTable({ name: 'permission_roles' })
  permissions: PermissionEntity[];

  @ApiProperty({
    type: () => UserEntity,
  })
  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'user_roles' })
  users?: UserEntity[] | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
