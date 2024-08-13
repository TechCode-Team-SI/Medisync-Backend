import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { InstallationRepository } from './infrastructure/persistence/installation.repository';
import { exceptionResponses } from './installations.messages';

@Injectable()
export class InstallationsService {
  constructor(
    private readonly installationRepository: InstallationRepository,
  ) {}

  async create(createInstallationDto: CreateInstallationDto) {
    const installationStep = await this.findOne();

    if (installationStep) {
      throw new NotFoundException(exceptionResponses.AlreadyExists);
    }

    return this.installationRepository.create(createInstallationDto);
  }

  findOne() {
    return this.installationRepository.findOne();
  }

  async update(updateInstallationDto: UpdateInstallationDto) {
    const installationStep = await this.findOne();

    if (!installationStep) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return this.installationRepository.update(
      installationStep.id,
      updateInstallationDto,
    );
  }
}
