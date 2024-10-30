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
  ForbiddenException,
} from '@nestjs/common';
import { DaysOffsService } from './days-offs.service';
import { CreateDaysOffDto } from './dto/create-days-off.dto';
import { UpdateDaysOffDto } from './dto/update-days-off.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DaysOff } from './domain/days-off';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllDaysOffsDto } from './dto/find-all-days-offs.dto';
import { exceptionResponses } from 'src/days-offs/days-offs.messages';
import { getPagination } from 'src/utils/get-pagination';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { EmployeeOnlyGuard } from 'src/common/employee-only.guard';

@ApiTags('Daysoffs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'days-offs',
  version: '1',
})
export class DaysOffsController {
  constructor(private readonly daysOffsService: DaysOffsService) {}

  @Post('for-me')
  @UseGuards(EmployeeOnlyGuard)
  @ApiCreatedResponse({
    type: DaysOff,
  })
  create(
    @Me() userPayload: JwtPayloadType,
    @Body() createDaysOffDto: CreateDaysOffDto,
  ) {
    if (!userPayload.employeeId) {
      throw new ForbiddenException(exceptionResponses.EmployeeNotExists);
    }
    return this.daysOffsService.create(
      createDaysOffDto,
      'employee',
      userPayload.employeeId,
    );
  }

  @Post('employee/:employeeId')
  @UseGuards(EmployeeOnlyGuard)
  @ApiCreatedResponse({
    type: DaysOff,
  })
  @ApiParam({
    name: 'employeeId',
    type: String,
    required: true,
  })
  createForEmployee(
    @Body() createDaysOffDto: CreateDaysOffDto,
    @Param('employeeId') employeeId: string,
  ) {
    return this.daysOffsService.create(
      createDaysOffDto,
      'employee',
      employeeId,
    );
  }

  @Post('agenda/:agendaId')
  @UseGuards(EmployeeOnlyGuard)
  @ApiCreatedResponse({
    type: DaysOff,
  })
  @ApiParam({
    name: 'agendaId',
    type: String,
    required: true,
  })
  createForSpeciality(
    @Body() createDaysOffDto: CreateDaysOffDto,
    @Param('agendaId') agendaId: string,
  ) {
    return this.daysOffsService.create(createDaysOffDto, 'agenda', agendaId);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(DaysOff),
  })
  async findAll(
    @Query() query: FindAllDaysOffsDto,
  ): Promise<PaginationResponseDto<DaysOff>> {
    const paginationOptions = getPagination(query);

    return this.daysOffsService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
    });
  }

  @Get('me')
  @ApiOkResponse({
    type: PaginationResponse(DaysOff),
  })
  async findAllMine(
    @Me() userPayload: JwtPayloadType,
    @Query() query: FindAllDaysOffsDto,
  ): Promise<PaginationResponseDto<DaysOff>> {
    if (!userPayload.employeeId) {
      throw new ForbiddenException(exceptionResponses.UserNotPermitted);
    }
    const paginationOptions = getPagination(query);

    return this.daysOffsService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
      filterOptions: {
        employeeIds: [userPayload.employeeId],
      },
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DaysOff,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.daysOffsService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @UseGuards(EmployeeOnlyGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DaysOff,
  })
  update(@Param('id') id: string, @Body() updateDaysOffDto: UpdateDaysOffDto) {
    return this.daysOffsService.update(id, updateDaysOffDto);
  }

  @Delete(':id')
  @UseGuards(EmployeeOnlyGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.daysOffsService.remove(id);
  }
}
