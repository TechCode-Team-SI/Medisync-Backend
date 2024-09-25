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
import { SymptomsService } from './symptoms.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Symptom } from './domain/symptom';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllSymptomsDto } from './dto/find-all-symptoms.dto';
import { exceptionResponses } from 'src/symptoms/symptoms.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Symptoms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'symptoms',
  version: '1',
})
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Symptom,
  })
  create(@Body() createSymptomDto: CreateSymptomDto) {
    return this.symptomsService.create(createSymptomDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Symptom),
  })
  async findAll(
    @Query() query: FindAllSymptomsDto,
  ): Promise<PaginationResponseDto<Symptom>> {
    const paginationOptions = getPagination(query);

    return this.symptomsService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Symptom,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.symptomsService.findOne(id);

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
    type: Symptom,
  })
  update(@Param('id') id: string, @Body() updateSymptomDto: UpdateSymptomDto) {
    return this.symptomsService.update(id, updateSymptomDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.symptomsService.remove(id);
  }
}
