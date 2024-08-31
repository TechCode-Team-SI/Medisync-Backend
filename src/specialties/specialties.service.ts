import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { SpecialtyRepository } from './infrastructure/persistence/specialty.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Specialty } from './domain/specialty';
import { FilesService } from 'src/files/files.service';
import { exceptionResponses } from './specialties.messages';
import { findOptions } from 'src/utils/types/fine-options.type';
import { CreateMultipleSpecialtyInternalDto } from './dto/create-multiple-specialty-internal.dto';
import { CreateSpecialtyInternalDto } from './dto/create-specialty-internal.dto';
import { UsersService } from 'src/users/users.service';
import {
  FilterSpecialtyDto,
  SortSpecialtyDto,
} from './dto/find-all-specialties.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    private readonly specialtyRepository: SpecialtyRepository,
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    if (createSpecialtyDto.image?.id) {
      const fileObject = await this.filesService.findById(
        createSpecialtyDto.image.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.ImageNotExist,
        );
      }
      createSpecialtyDto.image = fileObject;
    }
    return this.specialtyRepository.create(createSpecialtyDto);
  }

  async createMultiple({ specialties }: CreateMultipleSpecialtyInternalDto) {
    const payloads: CreateSpecialtyInternalDto[] = await Promise.all(
      specialties.map(async (specialty) => {
        const data = { ...specialty };
        if (data.image?.id) {
          const fileObject = await this.filesService.findById(data.image.id);
          if (!fileObject) {
            throw new UnprocessableEntityException(
              exceptionResponses.ImageNotExist,
            );
          }
          data.image = fileObject;
        }
        return data;
      }),
    );

    return this.specialtyRepository.createMultiple(payloads);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    filterOptions?: (FilterSpecialtyDto & { userId?: string }) | null;
    sortOptions?: SortSpecialtyDto[] | null;
  }) {
    let filterOpts: FilterSpecialtyDto = {};

    if (filterOptions?.userId) {
      const foundUser = await this.usersService.findById(filterOptions.userId, {
        withProfile: true,
      });
      if (!foundUser) {
        throw new UnprocessableEntityException(
          exceptionResponses.UserNotExists,
        );
      }
      if (!foundUser.employeeProfile) {
        throw new UnprocessableEntityException(
          exceptionResponses.UserNotSpecialist,
        );
      }
      filterOpts = { employeeProfileIds: [foundUser.employeeProfile.id] };
    }
    if (filterOptions?.search)
      filterOpts = { ...filterOpts, search: filterOptions.search };

    return this.specialtyRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      filterOptions: filterOpts,
      sortOptions,
    });
  }

  findOne(id: Specialty['id'], options?: findOptions) {
    return this.specialtyRepository.findById(id, options);
  }

  findAllWithNames(names: Specialty['name'][], options?: findOptions) {
    return this.specialtyRepository.findAllWithNames(names, options);
  }

  update(id: Specialty['id'], updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtyRepository.update(id, updateSpecialtyDto);
  }

  remove(id: Specialty['id']) {
    return this.specialtyRepository.remove(id);
  }
}
