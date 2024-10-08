import {
  Body,
  Controller,
  Delete,
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

@ApiTags('Medicalcenters')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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
  @ApiOkResponse({
    type: MedicalCenter,
  })
  update(@Body() updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return this.medicalCentersService.update(updateMedicalCenterDto);
  }

  @Delete()
  remove() {
    return this.medicalCentersService.remove();
  }
}
