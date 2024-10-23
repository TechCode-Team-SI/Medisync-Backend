import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { exceptionResponses } from 'src/medical-centers/medical-centers.messages';
import { MedicalCenter } from './domain/medical-center';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import { MedicalCentersService } from './medical-centers.service';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('Medicalcenters')
@Controller({
  path: 'medical-centers',
  version: '1',
})
export class MedicalCentersController {
  constructor(private readonly medicalCentersService: MedicalCentersService) {}

  @Get()
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
  update(@Body() updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return this.medicalCentersService.update(updateMedicalCenterDto);
  }
}
