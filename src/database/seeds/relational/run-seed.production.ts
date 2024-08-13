import { NestFactory } from '@nestjs/core';
import { PermissionSeedService } from './permission/permission-seed.service';
import { SeedModule } from './seed.module';
import { InstallationSeedService } from './installation/installation-seed.service';
import { RoleSeedService } from './role/role-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(InstallationSeedService).run('new');
  await app.get(PermissionSeedService).run();
  await app.get(RoleSeedService).run('production');
  await app.close();
};

void runSeed();
