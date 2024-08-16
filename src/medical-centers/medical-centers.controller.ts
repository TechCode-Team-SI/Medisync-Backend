import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllMedicalCentersDto } from './dto/find-all-medical-centers.dto';
import { exceptionResponses } from 'src/medical-centers/medical-centers.messages';
import { getPagination } from 'src/utils/get-pagination';

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

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(MedicalCenter),
  })
  async findAll(
    @Query() query: FindAllMedicalCentersDto,
  ): Promise<PaginationResponseDto<MedicalCenter>> {
    const paginationOptions = getPagination(query);

    return this.medicalCentersService.findAllWithPagination({
      paginationOptions,
    });
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
