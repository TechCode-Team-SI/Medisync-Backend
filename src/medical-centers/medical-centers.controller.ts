import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpCachePath } from 'src/common/cache-decorators';
import { HttpCacheInvalidatorInterceptor } from 'src/common/http-cache-invalidator.interceptor';
import { HttpCacheInterceptor } from 'src/common/http-cache.interceptor';
import { exceptionResponses } from 'src/medical-centers/medical-centers.messages';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { MedicalCenter } from './domain/medical-center';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import { MedicalCentersService } from './medical-centers.service';

@ApiTags('Medicalcenters')
@Controller({
  path: 'medical-centers',
  version: '1',
})
export class MedicalCentersController {
  constructor(private readonly medicalCentersService: MedicalCentersService) {}

  @Get()
  @UseInterceptors(HttpCacheInterceptor)
  @ApiOkResponse({
    type: MedicalCenter,
  })
  async findOne() {
    const entity = await this.medicalCentersService.findOne();

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch()
  @Permissions(PermissionsEnum.CONFIGURE_MEDICAL_CENTER)
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: MedicalCenter,
  })
  @HttpCachePath()
  @UseInterceptors(HttpCacheInvalidatorInterceptor)
  update(@Body() updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return this.medicalCentersService.update(updateMedicalCenterDto);
  }
}
