import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { PermissionSeedService } from './permission/permission-seed.service';
import { InstallationSeedService } from './installation/installation-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(InstallationSeedService).run('installed');
  await app.get(PermissionSeedService).run();
  await app.get(RoleSeedService).run('development');
  await app.get(UserSeedService).run();

  await app.close();
};

void runSeed();
