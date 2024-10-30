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
import { IllnessesService } from './illnesses.service';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Illness } from './domain/illness';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllIllnessesDto } from './dto/find-all-illnesses.dto';
import { exceptionResponses } from 'src/illnesses/illnesses.messages';
import { getPagination } from 'src/utils/get-pagination';
import { EmployeeOnlyGuard } from 'src/common/employee-only.guard';
@ApiTags('Illnesses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'illnesses',
  version: '1',
})
export class IllnessesController {
  constructor(private readonly illnessesService: IllnessesService) {}

  @Post()
  @UseGuards(EmployeeOnlyGuard)
  @ApiCreatedResponse({
    type: Illness,
  })
  create(@Body() createIllnessDto: CreateIllnessDto) {
    return this.illnessesService.create(createIllnessDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Illness),
  })
  async findAll(
    @Query() query: FindAllIllnessesDto,
  ): Promise<PaginationResponseDto<Illness>> {
    const paginationOptions = getPagination(query);

    return this.illnessesService.findAllWithPagination({
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
    type: Illness,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.illnessesService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @UseGuards(EmployeeOnlyGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Illness,
  })
  update(@Param('id') id: string, @Body() updateIllnessDto: UpdateIllnessDto) {
    return this.illnessesService.update(id, updateIllnessDto);
  }

  @Delete(':id')
  @UseGuards(EmployeeOnlyGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.illnessesService.remove(id);
  }
}
