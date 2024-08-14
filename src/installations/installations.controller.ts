import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Installation } from './domain/installation';
import { StepOneInstallationDto } from './dto/step-one-installation.dto';
import {
  CurrentInstallationStep,
  IsInstallationEndpoint,
} from './installations.decorator';
import { InstallationStepEnum } from './installations.enum';
import { InstallationsService } from './installations.service';

@ApiTags('Installation')
@ApiBearerAuth()
@IsInstallationEndpoint()
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
  processStepTwo() {
    return this.installationsService.processStepTwo();
  }

  @Post('/three')
  @ApiOkResponse({
    type: Installation,
  })
  @CurrentInstallationStep(InstallationStepEnum.CONFIGURE_MODULES)
  processStepThree() {
    return this.installationsService.processStepThree();
  }
}
