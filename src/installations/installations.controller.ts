import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { CreateMedicalCenterDto } from 'src/medical-centers/dto/create-medical-center.dto';
import { ApplyPackagesDto } from '../packages/dto/apply-packages.dto';
import { Installation } from './domain/installation';
import { StepOneInstallationDto } from './dto/step-one-installation.dto';
import {
  CurrentInstallationStep,
  IsInstallationEndpoint,
} from './installations.decorator';
import { InstallationStepEnum } from './installations.enum';
import { InstallationsService } from './installations.service';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { PrivateGuard } from 'src/common/private.guard';

@ApiTags('Installation')
@ApiBearerAuth()
@Controller({
  path: 'installation',
  version: '1',
})
export class InstallationsController {
  constructor(private readonly installationsService: InstallationsService) {}

  @Post('/one')
  @IsInstallationEndpoint()
  @UseGuards(PrivateGuard)
  @ApiOkResponse()
  @CurrentInstallationStep(InstallationStepEnum.CREATE_ADMIN)
  processStepOne(@Body() createUserDto: StepOneInstallationDto) {
    return this.installationsService.processStepOne(createUserDto);
  }

  @Post('/two')
  @IsInstallationEndpoint()
  @UseGuards(PrivateGuard)
  @ApiOkResponse({
    type: Installation,
  })
  @CurrentInstallationStep(InstallationStepEnum.CONFIGURE_COMPANY)
  processStepTwo(@Body() createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.installationsService.processStepTwo(createMedicalCenterDto);
  }

  @Post('/three')
  @IsInstallationEndpoint()
  @UseGuards(PrivateGuard)
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

  @Post('/token')
  @ApiOkResponse()
  verifyToken(@Body() verifyTokenDto: VerifyTokenDto): SuccessResponseDto {
    //TODO: add rate limiter (low priority)
    return this.installationsService.verifyToken(verifyTokenDto.token);
  }

  @Get('/step')
  getInstallationStep() {
    return this.installationsService.getInstallationStep();
  }
}
