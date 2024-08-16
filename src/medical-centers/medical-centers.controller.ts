import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
  ApiParam,
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
  create(@Body() createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.medicalCentersService.create(createMedicalCenterDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: MedicalCenter,
  })
  async findOne(@Param('id') id: number) {
    const entity = await this.medicalCentersService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: MedicalCenter,
  })
  update(
    @Param('id') id: number,
    @Body() updateMedicalCenterDto: UpdateMedicalCenterDto,
  ) {
    return this.medicalCentersService.update(id, updateMedicalCenterDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: number) {
    return this.medicalCentersService.remove(id);
  }
}
