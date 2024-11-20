import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { RequestStatusEnum } from 'src/requests/requests.enum';
import { RequestsService } from 'src/requests/requests.service';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Rating } from './domain/rating';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingRepository } from './infrastructure/persistence/rating.repository';
import { exceptionResponses } from './ratings.messages';

@Injectable()
export class RatingsService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    { stars, review }: { stars: number; review: string },
    requestId: string,
    userPayload: JwtPayloadType,
  ) {
    if (!(stars >= 0 && stars <= 5)) {
      throw new UnprocessableEntityException(exceptionResponses.StarsOutRange);
    }

    const foundUser = await this.usersService.findById(userPayload.id);
    if (!foundUser) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotExists);
    }

    const foundRequest = await this.requestsService.findOne(requestId);
    if (!foundRequest) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestNotExists,
      );
    }

    const foundRating = await this.requestsService.findRating(requestId);
    if (foundRating) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestAlreadyRated,
      );
    }

    if (foundRequest.status != RequestStatusEnum.COMPLETED) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestNotCompleted,
      );
    }

    const clonedPayload = {
      stars,
      review,
      ratedBy: foundUser,
      request: foundRequest,
    };

    return this.ratingRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.ratingRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Rating['id'], options?: findOptions) {
    return this.ratingRepository.findById(id, options);
  }

  update(id: Rating['id'], updateRatingDto: UpdateRatingDto) {
    return this.ratingRepository.update(id, updateRatingDto);
  }

  remove(id: Rating['id']) {
    return this.ratingRepository.remove(id);
  }
}
