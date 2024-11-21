import { NestFactory } from '@nestjs/core';
import { PermissionSeedService } from './permission/permission-seed.service';
import { SeedModule } from './seed.module';
import { InstallationSeedService } from './installation/installation-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { PackageSeedService } from './package/package-seed.service';
import { PathologySeedService } from './pathology/pathology-seed.service';
import { IllnessSeedService } from './illness/illness-seed.service';
import { InjurySeedService } from './injury/injury-seed.service';
import { SymptomSeedService } from './symptom/symptom-seed.service';
import { TreatmentSeedService } from './treatment/treatment-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(InstallationSeedService).run('new');
  await app.get(PermissionSeedService).run();
  await app.get(RoleSeedService).run('production');
  await app.get(PackageSeedService).run();
  await app.get(PathologySeedService).run();
  await app.get(IllnessSeedService).run();
  await app.get(InjurySeedService).run();
  await app.get(SymptomSeedService).run();
  await app.get(TreatmentSeedService).run();
  await app.close();
};

void runSeed();
