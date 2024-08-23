import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { PermissionSeedService } from './permission/permission-seed.service';
import { InstallationSeedService } from './installation/installation-seed.service';
import appConfig from 'src/config/app.config';
import { AppConfig } from 'src/config/app-config.type';
import { FieldQuestionSeedService } from './question/question-seed.service';
import { RequestTemplateSeedService } from './request-template/request-template-seed.service';
import { SpecialtySeedService } from './specialty/specialty-seed.service';
import { PackageSeedService } from './package/package-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  const config = appConfig() as AppConfig;
  const installationSeedType =
    config.installInitialStep === 'INITIAL' ? 'new' : 'installed';

  await app.get(InstallationSeedService).run(installationSeedType);
  await app.get(PermissionSeedService).run();
  await app.get(RoleSeedService).run('development');
  await app.get(SpecialtySeedService).run();
  if (config.installInitialStep !== 'INITIAL') {
    await app.get(UserSeedService).run();
  }
  await app.get(FieldQuestionSeedService).run();
  await app.get(RequestTemplateSeedService).run();
  await app.get(PackageSeedService).run();

  await app.close();
};

void runSeed();
