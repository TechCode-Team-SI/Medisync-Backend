import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { CreateMedicalCenterDto } from 'src/medical-centers/dto/create-medical-center.dto';
import { ApplyPackagesDto } from '../packages/dto/apply-packages.dto';
import { Installation } from './domain/installation';
import { StepOneInstallationDto } from './dto/step-one-installation.dto';
import {
  CurrentInstallationStep,
  IsUnguarded,
} from './installations.decorator';
import { InstallationStepEnum } from './installations.enum';
import { InstallationsService } from './installations.service';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@ApiTags('Installation')
@ApiBearerAuth()
@IsUnguarded()
@Controller({
  path: 'installation',
  version: '1',
})
export class InstallationsController {
  constructor(private readonly installationsService: InstallationsService) {}

  @Post('/one')
  @ApiOkResponse({
    type: Installation,
  })
  @CurrentInstallationStep(InstallationStepEnum.CREATE_ADMIN)
  processStepOne(@Body() createUserDto: StepOneInstallationDto) {
    return this.installationsService.processStepOne(createUserDto);
  }

  @Post('/two')
  @ApiOkResponse({
    type: Installation,
  })
  @CurrentInstallationStep(InstallationStepEnum.CONFIGURE_COMPANY)
  processStepTwo(@Body() createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.installationsService.processStepTwo(createMedicalCenterDto);
  }

  @Post('/three')
  @ApiOkResponse({
    type: Installation,
  })
  @CurrentInstallationStep(InstallationStepEnum.CONFIGURE_MODULES)
  @UseInterceptors(TransactionInterceptor)
  processStepThree(
    @Body() installationThreeDto: ApplyPackagesDto,
  ): Promise<SuccessResponseDto> {
    return this.installationsService.processStepThree(
      ...installationThreeDto.slugs,
    );
  }
}
