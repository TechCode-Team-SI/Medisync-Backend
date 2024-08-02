import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { permissionsController } from './permissions.controller';
import { RelationalpermissionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';

@Module({
  imports: [
    RelationalpermissionPersistenceModule,
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [permissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService, RelationalpermissionPersistenceModule],
})
export class permissionsModule {}
