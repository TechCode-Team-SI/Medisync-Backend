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
import { PathologiesService } from './pathologies.service';
import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Pathology } from './domain/pathology';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllPathologiesDto } from './dto/find-all-pathologies.dto';
import { exceptionResponses } from 'src/pathologies/pathologies.messages';
import { getPagination } from 'src/utils/get-pagination';
import { EmployeeOnlyGuard } from 'src/common/employee-only.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('Pathologies')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'pathologies',
  version: '1',
})
export class PathologiesController {
  constructor(private readonly pathologiesService: PathologiesService) {}

  @Post()
  @UseGuards(EmployeeOnlyGuard)
  @Permissions(PermissionsEnum.MANAGE_PATHOLOGIES)
  @UseGuards(PermissionsGuard)
  @ApiCreatedResponse({
    type: Pathology,
  })
  create(@Body() createPathologyDto: CreatePathologyDto) {
    return this.pathologiesService.create(createPathologyDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Pathology),
  })
  async findAll(
    @Query() query: FindAllPathologiesDto,
  ): Promise<PaginationResponseDto<Pathology>> {
    const paginationOptions = getPagination(query);

    return this.pathologiesService.findAllWithPagination({
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
    type: Pathology,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.pathologiesService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @UseGuards(EmployeeOnlyGuard)
  @Permissions(PermissionsEnum.MANAGE_PATHOLOGIES)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Pathology,
  })
  update(
    @Param('id') id: string,
    @Body() updatePathologyDto: UpdatePathologyDto,
  ) {
    return this.pathologiesService.update(id, updatePathologyDto);
  }

  @Delete(':id')
  @UseGuards(EmployeeOnlyGuard)
  @Permissions(PermissionsEnum.MANAGE_PATHOLOGIES)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.pathologiesService.remove(id);
  }
}
