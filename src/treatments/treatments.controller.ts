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
import { TreatmentsService } from './treatments.service';
import { CreatetreatmentDto } from './dto/create-treatment.dto';
import { UpdatetreatmentDto } from './dto/update-treatment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Treatment } from './domain/treatment';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAlltreatmentsDto } from './dto/find-all-treatments.dto';
import { exceptionResponses } from 'src/treatments/treatments.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Treatments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'treatments',
  version: '1',
})
export class treatmentsController {
  constructor(private readonly TreatmentsService: TreatmentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Treatment,
  })
  create(@Body() createtreatmentDto: CreatetreatmentDto) {
    return this.TreatmentsService.create(createtreatmentDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Treatment),
  })
  async findAll(
    @Query() query: FindAlltreatmentsDto,
  ): Promise<PaginationResponseDto<Treatment>> {
    const paginationOptions = getPagination(query);

    return this.TreatmentsService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Treatment,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.TreatmentsService.findOne(id);

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
    type: Treatment,
  })
  update(
    @Param('id') id: string,
    @Body() updatetreatmentDto: UpdatetreatmentDto,
  ) {
    return this.TreatmentsService.update(id, updatetreatmentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.TreatmentsService.remove(id);
  }
}
