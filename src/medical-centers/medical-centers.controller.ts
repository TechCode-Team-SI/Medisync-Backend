import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { MedicalCentersService } from './medical-centers.service';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MedicalCenter } from './domain/medical-center';
import { AuthGuard } from '@nestjs/passport';
import { exceptionResponses } from 'src/medical-centers/medical-centers.messages';

@ApiTags('Medicalcenters')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'medical-centers',
  version: '1',
})
export class MedicalCentersController {
  constructor(private readonly medicalCentersService: MedicalCentersService) {}

  @Post()
  @ApiCreatedResponse({
    type: MedicalCenter,
  })
  async create(@Body() createMedicalCenterDto: CreateMedicalCenterDto) {
    const entity = await this.medicalCentersService.findOne();

    if (entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return this.medicalCentersService.create(createMedicalCenterDto);
  }

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
