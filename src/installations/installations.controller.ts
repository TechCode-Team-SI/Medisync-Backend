import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
import { PackagesService } from 'src/packages/packages.service';
import {
  PaginationResponse,
  PaginationResponseDto,
} from 'src/utils/dto/pagination-response.dto';
import { Package } from 'src/packages/domain/package';
import { FindAllPackagesDto } from 'src/packages/dto/find-all-packages.dto';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Installation')
@ApiBearerAuth()
@Controller({
  path: 'installation',
  version: '1',
})
export class InstallationsController {
  constructor(
    private readonly installationsService: InstallationsService,
    private readonly packagesService: PackagesService,
  ) {}

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
  @CurrentInstallationStep(InstallationStepEnum.CONFIGURE_MODULES)
  @UseInterceptors(TransactionInterceptor)
  processStepTwo(
    @Body() installationThreeDto: ApplyPackagesDto,
  ): Promise<SuccessResponseDto> {
    return this.installationsService.processStepTwo(
      ...installationThreeDto.slugs,
    );
  }

  @Post('/three')
  @IsInstallationEndpoint()
  @UseGuards(PrivateGuard)
  @ApiOkResponse({
    type: Installation,
  })
  @CurrentInstallationStep(InstallationStepEnum.CONFIGURE_COMPANY)
  processStepThree(@Body() createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.installationsService.processStepThree(createMedicalCenterDto);
  }

  @Get('/packages')
  @IsInstallationEndpoint()
  @UseGuards(PrivateGuard)
  @ApiOkResponse({
    type: PaginationResponse(Package),
  })
  async findAll(
    @Query() query: FindAllPackagesDto,
  ): Promise<PaginationResponseDto<Package>> {
    return this.packagesService.findAllWithPagination({
      paginationOptions: getPagination(query),
      sortOptions: query.sort,
      filterOptions: query.filters,
    });
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
