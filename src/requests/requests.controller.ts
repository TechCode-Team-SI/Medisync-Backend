import { CreateInstructionsDto } from 'src/instructions/dto/create-instructions.dto';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { exceptionResponses } from 'src/requests/requests.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { Request } from './domain/request';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/find-all-requests.dto';
import { RequestsService } from './requests.service';
import { FinishRequestDto } from './dto/finish-request.dto';
import { RequestStatusEnum } from './requests.enum';
import { DiagnosticsService } from 'src/diagnostics/diagnostics.service';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { InstructionsService } from 'src/instructions/instructions.service';
import { CreateDiagnosticDto } from 'src/diagnostics/dto/create-diagnostic.dto';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { CreateRatingDto } from 'src/ratings/dto/create-rating.dto';
import { RatingsService } from 'src/ratings/ratings.service';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';

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
    private readonly diagnosticsService: DiagnosticsService,
    private readonly instructionsService: InstructionsService,
    private readonly specialtiesService: SpecialtiesService,
    private readonly ratingsService: RatingsService,
  ) {}

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

  @Patch(':id')
  @ApiOkResponse({
    type: Request,
  })
  async finish(
    @Me() userPayload: JwtPayloadType,
    @Body() body: FinishRequestDto,
    @Param('id') id: string,
  ) {
    const request = await this.requestsService.findOne(id, {
      withSpecialty: true,
    });
    if (!request) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (request.requestedMedic.id !== userPayload.id) {
      throw new ForbiddenException(exceptionResponses.CurrentMedicNotAllowed);
    }
    const specialty = await this.specialtiesService.findOne(
      request.requestedSpecialty.id,
      {
        minimal: true,
      },
    );
    if (!specialty) {
      throw new UnprocessableEntityException(
        exceptionResponses.SpecialtyNotExists,
      );
    }

    const createDiagnosticDto: CreateDiagnosticDto = {
      description: body.diagnostic,
      request,
      specialty,
    };

    const createInstructionsDto: CreateInstructionsDto = {
      description: body.instructions,
      request,
      specialty,
    };

    await this.diagnosticsService.create(createDiagnosticDto, userPayload.id);
    await this.instructionsService.create(
      createInstructionsDto,
      userPayload.id,
    );
    return this.requestsService.finish(id, RequestStatusEnum.COMPLETED);
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
