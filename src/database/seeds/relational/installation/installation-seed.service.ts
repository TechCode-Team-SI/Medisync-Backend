import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstallationEntity } from 'src/installations/infrastructure/persistence/relational/entities/installation.entity';
import { InstallationStepEnum } from 'src/installations/installations.enum';

@Injectable()
export class InstallationSeedService {
  constructor(
    @InjectRepository(InstallationEntity)
    private repository: Repository<InstallationEntity>,
  ) {}

  async run(type: 'installed' | 'new') {
    const installationCount = await this.repository.count();
    if (installationCount > 0) return;

    const installationStep = new InstallationEntity();
    installationStep.step =
      type === 'new'
        ? InstallationStepEnum.CREATE_ADMIN
        : InstallationStepEnum.FINISHED;
    await this.repository.save(installationStep);
  }
}
