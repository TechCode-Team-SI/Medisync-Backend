import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleRepository } from './infrastructure/persistence/schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Schedule } from './domain/schedule';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterSchedulesDto,
  SortSchedulesDto,
} from 'src/schedules/dto/find-all-schedules.dto';
import { isHourALessThanHourB } from 'src/utils/utils';
import { exceptionResponses } from './schedules.messages';

@Injectable()
export class SchedulesService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  create(createScheduleDto: CreateScheduleDto) {
    if (!isHourALessThanHourB(createScheduleDto.from, createScheduleDto.to)) {
      throw new UnprocessableEntityException(exceptionResponses.InvalidFromTo);
    }
    return this.scheduleRepository.create(createScheduleDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortSchedulesDto[] | null;
    filterOptions?: FilterSchedulesDto | null;
  }) {
    return this.scheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Schedule['id'], options?: findOptions) {
    return this.scheduleRepository.findById(id, options);
  }

  async update(id: Schedule['id'], updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (updateScheduleDto.from && !updateScheduleDto.to) {
      if (!isHourALessThanHourB(updateScheduleDto.from, schedule.to)) {
        throw new UnprocessableEntityException(
          exceptionResponses.InvalidFromTo,
        );
      }
    } else if (!updateScheduleDto.from && updateScheduleDto.to) {
      if (!isHourALessThanHourB(schedule.from, updateScheduleDto.to)) {
        throw new UnprocessableEntityException(
          exceptionResponses.InvalidFromTo,
        );
      }
    } else if (updateScheduleDto.from && updateScheduleDto.to) {
      if (!isHourALessThanHourB(updateScheduleDto.from, updateScheduleDto.to)) {
        throw new UnprocessableEntityException(
          exceptionResponses.InvalidFromTo,
        );
      }
    }

    return this.scheduleRepository.update(id, updateScheduleDto);
  }

  async remove(id: Schedule['id']) {
    const schedule = await this.scheduleRepository.findById(id, {
      withEmployees: true,
    });
    if (!schedule) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (schedule.employees && schedule.employees.length > 0) {
      throw new UnprocessableEntityException(
        exceptionResponses.ScheduleHasEmployees,
      );
    }
    return this.scheduleRepository.remove(id);
  }
}
