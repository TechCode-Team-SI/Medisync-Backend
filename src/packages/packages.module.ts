import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { RelationalPackagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ConfigModule } from '@nestjs/config';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { FieldQuestionsModule } from 'src/field-questions/field-questions.module';
import { RequestTemplatesModule } from 'src/request-templates/request-templates.module';
import { PackagesController } from './packages.controller';
import { PathologiesModule } from 'src/pathologies/pathologies.module';
import { SymptomsModule } from 'src/symptoms/symptoms.module';
import { InjuriesModule } from 'src/injuries/injuries.module';
import { treatmentsModule } from 'src/treatments/treatments.module';
import { FilesS3Module } from 'src/files/infrastructure/uploader/s3/files.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    RelationalPackagePersistenceModule,
    ConfigModule,
    SpecialtiesModule,
    FieldQuestionsModule,
    RequestTemplatesModule,
    PathologiesModule,
    SymptomsModule,
    treatmentsModule,
    InjuriesModule,
    FilesS3Module,
    permissionsModule,
    UsersModule,
  ],
  providers: [PackagesService],
  controllers: [PackagesController],
  exports: [PackagesService, RelationalPackagePersistenceModule],
})
export class PackagesModule {}
