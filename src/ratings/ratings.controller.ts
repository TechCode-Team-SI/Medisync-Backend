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
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Rating } from './domain/rating';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllRatingsDto } from './dto/find-all-ratings.dto';
import { exceptionResponses } from 'src/ratings/ratings.messages';
import { getPagination } from 'src/utils/get-pagination';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { Me } from 'src/auth/auth.decorator';

@ApiTags('Ratings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ratings',
  version: '1',
})
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Rating,
  })
  create(
    @Me() userPayload: JwtPayloadType,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    return this.ratingsService.create(createRatingDto, userPayload);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Rating),
  })
  async findAll(
    @Query() query: FindAllRatingsDto,
  ): Promise<PaginationResponseDto<Rating>> {
    const paginationOptions = getPagination(query);

    return this.ratingsService.findAllWithPagination({
      paginationOptions,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Rating,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.ratingsService.findOne(id);

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
    type: Rating,
  })
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(id, updateRatingDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(id);
  }
}
