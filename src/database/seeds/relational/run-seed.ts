import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { PermissionSeedService } from './permission/permission-seed.service';
import { InstallationSeedService } from './installation/installation-seed.service';
import appConfig from 'src/config/app.config';
import { AppConfig } from 'src/config/app-config.type';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  const config = appConfig() as AppConfig;
  const installationSeedType =
    config.installInitialStep === 'INITIAL' ? 'new' : 'installed';

  await app.get(InstallationSeedService).run(installationSeedType);
  await app.get(PermissionSeedService).run();
  await app.get(RoleSeedService).run('development');
  if (config.installInitialStep !== 'INITIAL') {
    await app.get(UserSeedService).run();
  }

  await app.close();
};

void runSeed();
