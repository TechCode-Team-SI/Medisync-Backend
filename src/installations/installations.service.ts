import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { InstallationRepository } from './infrastructure/persistence/installation.repository';
import { exceptionResponses } from './installations.messages';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { RolesEnum } from 'src/roles/roles.enum';
import { CreateMedicalCenterDto } from 'src/medical-centers/dto/create-medical-center.dto';
import { MedicalCentersService } from 'src/medical-centers/medical-centers.service';
import { InstallationStepEnum } from './installations.enum';
import { PackagesService } from 'src/packages/packages.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class InstallationsService {
  constructor(
    private readonly installationRepository: InstallationRepository,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly medicalCentersService: MedicalCentersService,
    private readonly packagesService: PackagesService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
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

  //CREATE FIRST USER
  async processStepOne(createUserDto: CreateUserDto) {
    const userCount = await this.usersService.count();
    if (userCount > 0) {
      throw new UnprocessableEntityException(
        exceptionResponses.UserAlreadyExists,
      );
    }

    const role = await this.rolesService.findbySlug(RolesEnum.OWNER);

    if (!role) {
      throw new NotFoundException(exceptionResponses.RoleNotExists);
    }

    const userDto = {
      ...createUserDto,
      roles: [{ id: role.id }],
    };

    const user = await this.usersService.create(userDto);

    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotCreated);
    }

    const authUser = await this.authService.validateLogin({
      email: user.email,
      password: createUserDto.password,
    });

    const installationInfo = await this.update({
      step: InstallationStepEnum.CONFIGURE_COMPANY,
    });

    return {
      ...installationInfo,
      user: authUser,
    };
  }

  //CREATE MEDICAL CENTER
  async processStepTwo(createMedicalCenterDto: CreateMedicalCenterDto) {
    let medicalCenter = await this.medicalCentersService.findOne();

    if (medicalCenter) {
      throw new NotFoundException(
        exceptionResponses.MedicalCenterAlreadyExists,
      );
    }

    const medicalCenterDto = {
      ...createMedicalCenterDto,
    };

    medicalCenter = await this.medicalCentersService.create(medicalCenterDto);

    if (!medicalCenter) {
      throw new UnprocessableEntityException(
        exceptionResponses.MedicalCenterNotCreated,
      );
    }

    return this.update({ step: InstallationStepEnum.CONFIGURE_MODULES });
  }

  //INSTALL MODULES
  async processStepThree(...slugs: string[]) {
    await this.packagesService.seed(...slugs);
    await this.update({
      step: InstallationStepEnum.FINISHED,
    });
    return { success: true };
  }

  //VERIFY TOKEN VALIDITY
  verifyToken(receivedToken: string) {
    const token = this.configService.getOrThrow('app.installToken', {
      infer: true,
    });

    if (receivedToken !== token) {
      throw new ForbiddenException(exceptionResponses.InvalidToken);
    }

    return { success: true };
  }
}
