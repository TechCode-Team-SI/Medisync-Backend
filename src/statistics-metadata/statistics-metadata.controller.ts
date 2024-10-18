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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.statisticsMetadataService.remove(id);
  }
}
