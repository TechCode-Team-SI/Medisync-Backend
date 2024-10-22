import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
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
import { exceptionResponses } from 'src/request-templates/request-templates.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { RequestTemplate } from './domain/request-template';
import { CreateRequestTemplateDto } from './dto/create-request-template.dto';
import { FindAllRequestTemplatesDto } from './dto/find-all-request-templates.dto';
import { RequestTemplatesService } from './request-templates.service';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('Requesttemplates')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'request-templates',
  version: '1',
})
export class RequestTemplatesController {
  constructor(
    private readonly requestTemplatesService: RequestTemplatesService,
  ) {}

  @Post()
  @Permissions(PermissionsEnum.MANAGE_FORMS)
  @UseGuards(PermissionsGuard)
  @ApiCreatedResponse({
    type: RequestTemplate,
  })
  create(@Body() createRequestTemplateDto: CreateRequestTemplateDto) {
    return this.requestTemplatesService.create(createRequestTemplateDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(RequestTemplate),
  })
  async findAll(
    @Query() query: FindAllRequestTemplatesDto,
  ): Promise<PaginationResponseDto<RequestTemplate>> {
    const paginationOptions = getPagination(query);

    return this.requestTemplatesService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
      filterOptions: query.filters,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RequestTemplate,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.requestTemplatesService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }
}
