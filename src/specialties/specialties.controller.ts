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
  HttpStatus,
  HttpCode,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Specialty } from './domain/specialty';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllSpecialtiesDto } from './dto/find-all-specialties.dto';
import { exceptionResponses } from 'src/specialties/specialties.messages';
import { getPagination } from 'src/utils/get-pagination';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { EmployeeOnlyGuard } from 'src/common/employee-only.guard';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { FindAllSpecialtiesPaginationOnlyDto } from './dto/find-all-specialties-pagination-only.dto';
import { UpdateSpecialtyRequestTemplateDto } from './dto/update-specialty-request-template.dto';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { UpdateSpecialtyAgendaDto } from './dto/update-specialty-agenda.dto';

@ApiTags('Specialties')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'specialties',
  version: '1',
})
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Post()
  @UseGuards(EmployeeOnlyGuard)
  @Permissions(PermissionsEnum.MANAGE_SPECIALTIES)
  @UseGuards(PermissionsGuard)
  @ApiCreatedResponse({
    type: Specialty,
  })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Specialty),
  })
  async findAll(
    @Query() query: FindAllSpecialtiesDto,
  ): Promise<PaginationResponseDto<Specialty>> {
    const paginationOptions = getPagination(query);

    return this.specialtiesService.findAllWithPagination({
      paginationOptions,
      filterOptions: query.filters,
      sortOptions: query.sort,
    });
  }

  @Get('me')
  @ApiOkResponse({
    type: PaginationResponse(Specialty),
  })
  async findAllMine(
    @Me() userPayload: JwtPayloadType,
    @Query() query: FindAllSpecialtiesDto,
  ): Promise<PaginationResponseDto<Specialty>> {
    const search = query.filters?.search;
    const paginationOptions = getPagination(query);

    return this.specialtiesService.findAllWithPagination({
      paginationOptions,
      filterOptions: { userId: userPayload.id, search },
    });
  }

  @Get('active')
  @ApiOkResponse({
    type: PaginationResponse(Specialty),
  })
  async findAllActive(
    @Query() query: FindAllSpecialtiesPaginationOnlyDto,
  ): Promise<PaginationResponseDto<Specialty>> {
    const paginationOptions = getPagination(query);

    return this.specialtiesService.findAllActiveWithPagination({
      paginationOptions,
      isPublic: true,
    });
  }

  //TODO: update specialty pending permissions
  @Get('active/private')
  @ApiOkResponse({
    type: PaginationResponse(Specialty),
  })
  async findAllActivePrivate(
    @Query() query: FindAllSpecialtiesPaginationOnlyDto,
  ): Promise<PaginationResponseDto<Specialty>> {
    const paginationOptions = getPagination(query);

    return this.specialtiesService.findAllActiveWithPagination({
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
    type: Specialty,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.specialtiesService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @UseGuards(EmployeeOnlyGuard)
  @Permissions(PermissionsEnum.MANAGE_SPECIALTIES)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Specialty,
  })
  update(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtiesService.update(id, updateSpecialtyDto);
  }

  @Delete(':id')
  @UseGuards(EmployeeOnlyGuard)
  @Permissions(PermissionsEnum.MANAGE_SPECIALTIES)
  @UseGuards(PermissionsGuard)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  }

  //TODO: update specialty pending permissions
  @Put('/request-template')
  @UseInterceptors(TransactionInterceptor)
  @HttpCode(HttpStatus.OK)
  async updateRoom(
    @Body() updateUserRoom: UpdateSpecialtyRequestTemplateDto,
  ): Promise<SuccessResponseDto> {
    await this.specialtiesService.updateSpecialtyTemplate(
      updateUserRoom.id,
      updateUserRoom.requestTemplateId,
    );
    return { success: true };
  }

  //TODO: update specialty agenda pending permissions
  @Put('/agenda')
  @HttpCode(HttpStatus.OK)
  async updateAgenda(
    @Body() updateSpecialtyAgenda: UpdateSpecialtyAgendaDto,
  ): Promise<SuccessResponseDto> {
    await this.specialtiesService.updateSpecialtyAgenda(
      updateSpecialtyAgenda.id,
      updateSpecialtyAgenda.agendaId,
    );
    return { success: true };
  }
}
