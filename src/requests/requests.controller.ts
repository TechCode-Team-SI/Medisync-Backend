import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Me } from 'src/auth/auth.decorator';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { CreateRatingDto } from 'src/ratings/dto/create-rating.dto';
import { RatingsService } from 'src/ratings/ratings.service';
import { exceptionResponses } from 'src/requests/requests.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { Request } from './domain/request';
import { CreateRequestWithReferenceDto } from './dto/create-request-with-reference.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
import { FinishRequestDto } from './dto/finish-request.dto';
import { RequestsService } from './requests.service';

@ApiTags('Requests')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'requests',
  version: '1',
})
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly ratingsService: RatingsService,
  ) {}

  //In private, the user can create a request with a reference
  @Post('reference')
  @ApiCreatedResponse({
    type: Request,
  })
  createWithReference(
    @Me() userPayload: JwtPayloadType,
    @Body() createRequestDto: CreateRequestWithReferenceDto,
  ) {
    return this.requestsService.create(createRequestDto, userPayload.id);
  }

  //In public, the user can create a request without a reference
  //The difference is ultimately reduced to permissions
  @Post()
  @ApiCreatedResponse({
    type: Request,
  })
  create(
    @Me() userPayload: JwtPayloadType,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    return this.requestsService.create(createRequestDto, userPayload.id);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Request),
  })
  findAll(
    @Query() query: FindAllRequestsDto,
  ): Promise<PaginationResponseDto<Request>> {
    const paginationOptions = getPagination(query);

    return this.requestsService.findAllMinimalWithPagination({
      paginationOptions,
      sortOptions: query.sort,
      filterOptions: query.filters,
    });
  }

  @Get('for-me')
  @ApiOkResponse({
    type: PaginationResponse(Request),
  })
  findAllRequestedMe(
    @Me() userPayload: JwtPayloadType,
    @Query() query: FindAllRequestsDto,
  ): Promise<PaginationResponseDto<Request>> {
    const status = query.filters?.status;
    const paginationOptions = getPagination(query);

    return this.requestsService.findAllMinimalWithPagination({
      paginationOptions,
      filterOptions: { requestedMedicIds: [userPayload.id], status },
    });
  }

  @Get('made-by-me')
  @ApiOkResponse({
    type: PaginationResponse(Request),
  })
  findAllMine(
    @Me() userPayload: JwtPayloadType,
    @Query() query: FindAllRequestsDto,
  ): Promise<PaginationResponseDto<Request>> {
    const status = query.filters?.status;
    const paginationOptions = getPagination(query);

    return this.requestsService.findAllMinimalWithPagination({
      paginationOptions,
      filterOptions: { madeByIds: [userPayload.id], status },
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Request,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.requestsService.findOneDetailed(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Post('finish/:id')
  @UseInterceptors(TransactionInterceptor)
  @ApiOkResponse({
    type: Request,
  })
  async finish(
    @Me() userPayload: JwtPayloadType,
    @Body() finishRequestDto: FinishRequestDto,
    @Param('id') id: string,
  ) {
    return this.requestsService.finish(id, userPayload.id, finishRequestDto);
  }

  @Post('attend/:id')
  @UseInterceptors(TransactionInterceptor)
  @ApiOkResponse({
    type: Request,
  })
  async attend(@Me() userPayload: JwtPayloadType, @Param('id') id: string) {
    return this.requestsService.attend(id, userPayload.id);
  }

  @Post('rate/:id')
  @ApiCreatedResponse({
    type: SuccessResponseDto,
  })
  async rate(
    @Param('id') id: string,
    @Me() userPayload: JwtPayloadType,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    const rating = await this.ratingsService.create(
      createRatingDto.stars,
      id,
      userPayload,
    );
    return { success: !!rating };
  }
}
