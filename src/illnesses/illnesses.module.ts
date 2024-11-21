import { forwardRef, Module } from '@nestjs/common';
import { IllnessesService } from './illnesses.service';
import { IllnessesController } from './illnesses.controller';
import { RelationalIllnessPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    RelationalIllnessPersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [IllnessesController],
  providers: [IllnessesService],
  exports: [IllnessesService, RelationalIllnessPersistenceModule],
})
export class IllnessesModule {}
