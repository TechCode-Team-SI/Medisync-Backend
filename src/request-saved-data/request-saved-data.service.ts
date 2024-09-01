import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RequestsService } from 'src/requests/requests.service';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RequestSavedData } from './domain/request-saved-data';
import {
  FilterRequestSavedDataDto,
  SortRequestSavedDataDto,
} from './dto/find-all-request-saved-data.dto';
import { RequestSavedDataRepository } from './infrastructure/persistence/request-saved-data.repository';
import { exceptionResponses } from './request-saved-data.messages';

@Injectable()
export class RequestSavedDataService {
  constructor(
    private readonly requestSavedDataRepository: RequestSavedDataRepository,
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createRequestSavedDataDto: { requestId: string; alias: string },
    userId: string,
  ) {
    const foundRequest = await this.requestsService.findOne(
      createRequestSavedDataDto.requestId,
      { withMadeBy: true },
    );
    if (!foundRequest) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestNotExists,
      );
    }
    const foundUser = await this.usersService.findById(userId, {
      minimal: true,
    });
    if (!foundUser) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotExists);
    }
    if (foundUser.id !== foundRequest.madeBy.id) {
      throw new UnprocessableEntityException(
        exceptionResponses.UserNotOwnerOfRequest,
      );
    }

    const clonedPayload = {
      alias: createRequestSavedDataDto.alias,
      request: foundRequest,
      user: foundUser,
    };
    return this.requestSavedDataRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRequestSavedDataDto[] | null;
    filterOptions?: FilterRequestSavedDataDto | null;
  }) {
    return this.requestSavedDataRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: RequestSavedData['id'], options?: findOptions) {
    return this.requestSavedDataRepository.findById(id, options);
  }

  remove(id: RequestSavedData['id']) {
    return this.requestSavedDataRepository.remove(id);
  }
}
