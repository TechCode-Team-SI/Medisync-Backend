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
import { EmployeeOnlyGuard } from 'src/common/employee-only.guard';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { CreateRatingDto } from 'src/ratings/dto/create-rating.dto';
import { RatingsService } from 'src/ratings/ratings.service';
import { exceptionResponses } from 'src/requests/requests.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { Request } from './domain/request';
import { RequestFormatted } from './domain/request-formatted';
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
  @UseGuards(EmployeeOnlyGuard)
  @ApiCreatedResponse({
    type: Request,
  })
  createWithReference(
    @Body() createRequestDto: CreateRequestWithReferenceDto,
    @Me() userPayload: JwtPayloadType,
  ) {
    return this.requestsService.create(createRequestDto, userPayload.id, {
      shouldBeSameAsUser: false,
    });
  }

  //In private, the user can create a request with a reference
  @Post('private')
  @UseGuards(EmployeeOnlyGuard)
  @ApiCreatedResponse({
    type: Request,
  })
  createPrivate(
    @Body() createRequestDto: CreateRequestDto,
    @Me() userPayload: JwtPayloadType,
  ) {
    return this.requestsService.create(createRequestDto, userPayload.id, {
      shouldBeSameAsUser: false,
    });
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
  @Permissions(PermissionsEnum.VIEW_ALL_REQUESTS)
  @UseGuards(PermissionsGuard)
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
      filterOptions: {
        requestedMedicIds: [userPayload.id],
        status,
        from: query.filters?.from,
        to: query.filters?.to,
        includeGroup: true,
      },
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

  @Post('cancel/:id')
  @UseInterceptors(TransactionInterceptor)
  @ApiOkResponse({
    type: Request,
  })
  async cancel(@Me() userPayload: JwtPayloadType, @Param('id') id: string) {
    return this.requestsService.cancel(id, userPayload.id, {
      cancelledBy: 'user',
    });
  }

  @Post('medic/cancel/:id')
  @UseInterceptors(TransactionInterceptor)
  @ApiOkResponse({
    type: Request,
  })
  async cancelByMedic(
    @Me() userPayload: JwtPayloadType,
    @Param('id') id: string,
  ) {
    return this.requestsService.cancel(id, userPayload.id, {
      cancelledBy: 'medic',
    });
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

  @Get('save/:requestTemplateId/:madeForId')
  @ApiParam({
    name: 'requestTemplateId',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'madeForId',
    type: String,
    required: true,
  })
  async findSaved(
    @Param('requestTemplateId') requestTemplateId: string,
    @Param('madeForId') madeForId: string,
  ): Promise<RequestFormatted | null> {
    const request = await this.requestsService.findAllMinimalWithPagination({
      paginationOptions: {
        limit: 1,
        page: 1,
      },
      filterOptions: {
        requestTemplateIds: [requestTemplateId],
        madeForIds: [madeForId],
      },
    });

    if (request.data.length === 0) {
      return null;
    }

    return this.requestsService.findOneDetailed(request.data[0].id);
  }

  @Post('save/:requestId/:madeForId')
  @ApiParam({
    name: 'requestId',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'madeForId',
    type: String,
    required: true,
  })
  async createSavedData(
    @Param('requestId') requestId: string,
    @Param('madeForId') madeForId: string,
    @Me() userPayload: JwtPayloadType,
  ): Promise<Request | null> {
    return this.requestsService.updateSaveData(
      requestId,
      userPayload.id,
      madeForId,
    );
  }
}
