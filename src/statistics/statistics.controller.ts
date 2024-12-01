import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from '../utils/dto/pagination-response.dto';
import { StatisticsService } from './statistics.service';
import { ChartGeneric } from './domain/chart-generic';
import { StatisticsFilterDto } from './dto/statistics-filter.dto';
import { TopGeneric } from './domain/top-generic';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';

@ApiTags('Statistics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'statistics',
  version: '1',
})
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('top-medics')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopMedics(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopMedics(query);
  }

  @Get('top-specialties')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopSpecialties(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopSpecialties(query);
  }

  @Get('top-weekdays')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopWeekdays(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopWeekdays(query);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(ChartGeneric),
  })
  async findAllStatisticGraphsMetadata(
    @Query() query: StatisticsFilterDto,
  ): Promise<Chart[]> {
    return this.statisticsService.findStatisticsGraphMetadata(query);
  }

  @Get('top-injury')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopInjury(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopInjury(query);
  }

  @Get('top-symptom')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopSymptom(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopSymptom(query);
  }

  @Get('top-treatment')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopTreatment(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopTreatment(query);
  }

  @Get('top-pathology')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopPathology(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopPathology(query);
  }

  @Get('top-ages')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopAges(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopAges(query);
  }

  @Get('top-genders')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopGenders(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopGenders(query);
  }

  @Get('top-detailed')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopDetailed(
    @Query() query: StatisticsFilterDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopDetailed(query);
  }
}
