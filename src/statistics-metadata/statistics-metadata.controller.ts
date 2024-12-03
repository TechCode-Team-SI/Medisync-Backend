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
import { StatisticsMetadataService } from './statistics-metadata.service';
import { CreateStatisticsMetadataDto } from './dto/create-statistics-metadata.dto';
import { UpdateStatisticsMetadataDto } from './dto/update-statistics-metadata.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StatisticsMetadata } from './domain/statistics-metadata';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllStatisticsMetadataDto } from './dto/find-all-statistics-metadata.dto';
import { exceptionResponses } from 'src/statistics-metadata/statistics-metadata.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  AvailableFieldQuestion,
  AvailableSpecialty,
} from './statistics-metadata.type';
import { GetAvailableFieldQuestionsDto } from './dto/get-avalable-field-questions.dto';
import { GetAvailableSpecialtiesDto } from './dto/get-available-specialties.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('StatisticsMetadata')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'statistics-metadata',
  version: '1',
})
export class StatisticsMetadataController {
  constructor(
    private readonly statisticsMetadataService: StatisticsMetadataService,
  ) {}

  @Post()
  @Permissions(PermissionsEnum.MANAGE_STATISTICS)
  @UseGuards(PermissionsGuard)
  @ApiCreatedResponse({
    type: StatisticsMetadata,
  })
  create(@Body() createStatisticsMetadataDto: CreateStatisticsMetadataDto) {
    return this.statisticsMetadataService.create(createStatisticsMetadataDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(StatisticsMetadata),
  })
  async findAll(
    @Query() query: FindAllStatisticsMetadataDto,
  ): Promise<PaginationResponseDto<StatisticsMetadata>> {
    const paginationOptions = getPagination(query);

    return this.statisticsMetadataService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
    });
  }

  @Get('specialties/:fieldQuestionId')
  @ApiParam({
    name: 'fieldQuestionId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PaginationResponse(StatisticsMetadata),
  })
  async getAvailableSpecialtiesForgraph(
    @Param('fieldQuestionId') fieldQuestionId: string,
    @Query() query: GetAvailableSpecialtiesDto,
  ): Promise<PaginationResponseDto<AvailableSpecialty>> {
    const pagination = getPagination(query);
    return this.statisticsMetadataService.getAvailableSpecialtiesForGraph(
      fieldQuestionId,
      {
        paginationOptions: pagination,
        filterOptions: query.filters,
      },
    );
  }

  @Get('all-specialties')
  @ApiParam({
    name: 'fieldQuestionId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PaginationResponse(StatisticsMetadata),
  })
  async getAllAvailableSpecialtiesForgraph(
    @Query() query: GetAvailableSpecialtiesDto,
  ): Promise<PaginationResponseDto<AvailableSpecialty>> {
    const pagination = getPagination(query);
    return this.statisticsMetadataService.getAllAvailableSpecialtiesForGraph({
      paginationOptions: pagination,
      filterOptions: query.filters,
    });
  }

  @Get('field-questions')
  @ApiOkResponse({
    type: PaginationResponse(StatisticsMetadata),
  })
  async getAvailableFieldQuestionsForGraph(
    @Query() query: GetAvailableFieldQuestionsDto,
  ): Promise<PaginationResponseDto<AvailableFieldQuestion>> {
    const paginationOptions = getPagination(query);
    return this.statisticsMetadataService.getAvailableFieldQuestionsForGraph({
      paginationOptions,
      filterOptions: query.filters,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: StatisticsMetadata,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.statisticsMetadataService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @Permissions(PermissionsEnum.MANAGE_STATISTICS)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: StatisticsMetadata,
  })
  update(
    @Param('id') id: string,
    @Body() updateStatisticsMetadataDto: UpdateStatisticsMetadataDto,
  ) {
    return this.statisticsMetadataService.update(
      id,
      updateStatisticsMetadataDto,
    );
  }

  @Delete(':id')
  @Permissions(PermissionsEnum.MANAGE_STATISTICS)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.statisticsMetadataService.remove(id);
  }
}
