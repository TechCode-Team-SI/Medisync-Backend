import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from '../utils/dto/pagination-response.dto';
import { TopMedics } from './domain/top-medics';
import { StatisticsService } from './statistics.service';
import { TopSpecialties } from './domain/top-specialties';
import { TopWeekdays } from './domain/top-weekdays';
import { ChartGeneric } from './domain/chart-generic';
import { StatisticsDateDto } from './dto/statistics-date.dto';
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
    type: PaginationResponse(TopMedics),
  })
  async findTopMedics(@Query() query: StatisticsDateDto): Promise<TopMedics[]> {
    return this.statisticsService.findTopMedics(query);
  }

  @Get('top-specialties')
  @ApiOkResponse({
    type: PaginationResponse(TopSpecialties),
  })
  async findTopSpecialties(
    @Query() query: StatisticsDateDto,
  ): Promise<TopSpecialties[]> {
    return this.statisticsService.findTopSpecialties(query);
  }

  @Get('top-weekdays')
  @ApiOkResponse({
    type: PaginationResponse(TopWeekdays),
  })
  async findTopWeekdays(
    @Query() query: StatisticsDateDto,
  ): Promise<TopWeekdays[]> {
    return this.statisticsService.findTopWeekdays(query);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(ChartGeneric),
  })
  async findAllStatisticGraphsMetadata(
    @Query() query: StatisticsDateDto,
  ): Promise<Chart[]> {
    return this.statisticsService.findStatisticsGraphMetadata(query);
  }

  @Get('top-injury')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopInjury(
    @Query() query: StatisticsDateDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopInjury(query);
  }

  @Get('top-symptom')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopSymptom(
    @Query() query: StatisticsDateDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopSymptom(query);
  }

  @Get('top-treatment')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopTreatment(
    @Query() query: StatisticsDateDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopTreatment(query);
  }

  @Get('top-pathology')
  @ApiOkResponse({
    type: PaginationResponse(TopGeneric),
  })
  async findTopPathology(
    @Query() query: StatisticsDateDto,
  ): Promise<TopGeneric[]> {
    return this.statisticsService.findTopPathology(query);
  }
}
