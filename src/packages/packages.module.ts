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
import { IllnessesModule } from 'src/illnesses/illnesses.module';
import { InjuriesModule } from 'src/injuries/injuries.module';
import { treatmentsModule } from 'src/treatments/treatments.module';

@Module({
  imports: [
    RelationalPackagePersistenceModule,
    ConfigModule,
    SpecialtiesModule,
    FieldQuestionsModule,
    RequestTemplatesModule,
    PathologiesModule,
    SymptomsModule,
    IllnessesModule,
    treatmentsModule,
    InjuriesModule,
  ],
  providers: [PackagesService],
  controllers: [PackagesController],
  exports: [PackagesService, RelationalPackagePersistenceModule],
})
export class PackagesModule {}
