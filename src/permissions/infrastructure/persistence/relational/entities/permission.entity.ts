import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';

@Entity({
  name: 'permission',
})
export class PermissionEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: UUID,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'CREATE_USER',
  })
  @Column({
    unique: true,
  })
  slug: string;

  @ApiProperty({
    type: String,
    example: 'Crear Usuario',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Permite crear un usuario',
  })
  @Column()
  description: string;

  @ApiProperty({
    type: () => RoleEntity,
  })
  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'permission_roles' })
  roles: RoleEntity[];
}
