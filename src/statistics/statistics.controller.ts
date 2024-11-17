import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from '../utils/dto/pagination-response.dto';
import { TopMedics } from './domain/top-medics';
import { FindTopGeneralDto } from './dto/find-top-general.dto';
import { StatisticsService } from './statistics.service';
import { TopSpecialties } from './domain/top-specialties';
import { TopWeekdays } from './domain/top-weekdays';
import { Tart } from 'src/statistics-metadata/statistics-metadata.type';
import { StatisticsTimeDto } from 'src/statistics-metadata/dto/statistics-time.dto';

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
  async findTopMedics(@Query() query: FindTopGeneralDto): Promise<TopMedics[]> {
    return this.statisticsService.findTopMedics(query);
  }

  @Get('top-specialties')
  @ApiOkResponse({
    type: PaginationResponse(TopMedics),
  })
  async findTopSpecialties(
    @Query() query: FindTopGeneralDto,
  ): Promise<TopSpecialties[]> {
    return this.statisticsService.findtopSpecialties(query);
  }

  @Get('top-weekdays')
  @ApiOkResponse({
    type: PaginationResponse(TopMedics),
  })
  async findTopWeekdays(
    @Query() query: FindTopGeneralDto,
  ): Promise<TopWeekdays[]> {
    return this.statisticsService.findtopWeekdays(query);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(TopMedics),
  })
  async findAllStatisticGraphsMetadata(
    @Query() query: StatisticsTimeDto,
  ): Promise<Tart[]> {
    return this.statisticsService.findStatisticsGraphMetadata(query);
  }
}
