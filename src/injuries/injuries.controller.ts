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
import { InjuriesService } from './injuries.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Injury } from './domain/injury';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllInjuriesDto } from './dto/find-all-injuries.dto';
import { exceptionResponses } from 'src/injuries/injuries.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Injuries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'injuries',
  version: '1',
})
export class InjuriesController {
  constructor(private readonly injuriesService: InjuriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Injury,
  })
  create(@Body() createInjuryDto: CreateInjuryDto) {
    return this.injuriesService.create(createInjuryDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Injury),
  })
  async findAll(
    @Query() query: FindAllInjuriesDto,
  ): Promise<PaginationResponseDto<Injury>> {
    const paginationOptions = getPagination(query);

    return this.injuriesService.findAllWithPagination({
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
    type: Injury,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.injuriesService.findOne(id);

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
    type: Injury,
  })
  update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto) {
    return this.injuriesService.update(id, updateInjuryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.injuriesService.remove(id);
  }
}
