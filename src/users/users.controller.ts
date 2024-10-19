import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UnprocessableEntityException,
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
import { Permissions } from '../permissions/permissions.decorator';
import { PermissionsEnum } from '../permissions/permissions.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Me } from 'src/auth/auth.decorator';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { EmployeeProfileStatusDto } from 'src/employee-profiles/dto/employee-profile-status.dto';
import {
  PaginationResponse,
  PaginationResponseDto,
} from 'src/utils/dto/pagination-response.dto';
import { getPagination } from 'src/utils/get-pagination';
import { PermissionsGuard } from '../permissions/permissions.guard';
import { NullableType } from '../utils/types/nullable.type';
import { User } from './domain/user';
import { QueryUserDto } from './dto/query-user.dto';
import { exceptionResponses } from './users.messages';
import { UsersService } from './users.service';
import { UserPatient } from 'src/user-patients/domain/user-patient';
import { UpdateUserPatientDto } from 'src/user-patients/dto/update-user-patient.dto';
import { CreateUserPatientDto } from 'src/user-patients/dto/create-user-patient.dto';
import { FindAllUserPatientsDto } from 'src/user-patients/dto/find-all-user-patients.dto';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: User,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Permissions(PermissionsEnum.CREATE_USER)
  @UseGuards(PermissionsGuard)
  @Post()
  @UseInterceptors(TransactionInterceptor)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createProfileDto);
  }

  @ApiOkResponse({
    type: PaginationResponse(User),
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<PaginationResponseDto<User>> {
    const paginationOptions = getPagination(query);

    return this.usersService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions,
      options: { employeeProfile: true },
    });
  }

  @ApiOkResponse({
    type: User,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: User['id']): Promise<NullableType<User>> {
    return this.usersService.findById(id);
  }

  @ApiOkResponse({
    type: User,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @Permissions(PermissionsEnum.EDIT_USER)
  @UseGuards(PermissionsGuard)
  update(
    @Param('id') id: User['id'],
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersService.update(id, updateProfileDto);
  }

  @ApiOkResponse({
    type: SuccessResponseDto,
  })
  @Patch('/employee-status/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @Permissions(PermissionsEnum.EDIT_USER)
  @UseGuards(PermissionsGuard)
  async updateEmployeeStatus(
    @Param('id') id: User['id'],
    @Me() userPayload: JwtPayloadType,
    @Body() profileStatus: EmployeeProfileStatusDto,
  ): Promise<SuccessResponseDto> {
    if (id === userPayload.id) {
      throw new UnprocessableEntityException(
        exceptionResponses.CannotChangeOwnStatus,
      );
    }
    await this.usersService.updateEmployeeStatus(id, profileStatus.status);
    return { success: true };
  }

  @ApiOkResponse({
    type: UserPatient,
  })
  @Patch('/patient/me/:patientId')
  @ApiParam({
    name: 'patientId',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async updateUserPatient(
    @Param('patientId') patientId: string,
    @Me() userPayload: JwtPayloadType,
    @Body() updateUserPatient: UpdateUserPatientDto,
  ): Promise<UserPatient | null> {
    return this.usersService.updateUserPatient(
      userPayload.id,
      patientId,
      updateUserPatient,
    );
  }

  @ApiOkResponse({
    type: UserPatient,
  })
  @Post('/patient/me')
  @HttpCode(HttpStatus.OK)
  async createUserPatient(
    @Me() userPayload: JwtPayloadType,
    @Body() createUserPatient: CreateUserPatientDto,
  ): Promise<UserPatient | null> {
    return this.usersService.createUserPatient(
      userPayload.id,
      createUserPatient,
    );
  }

  @Get('/patient/me')
  @HttpCode(HttpStatus.OK)
  async getMyUserPatients(
    @Query() query: FindAllUserPatientsDto,
    @Me() userPayload: JwtPayloadType,
  ): Promise<PaginationResponseDto<UserPatient>> {
    const paginationOptions = getPagination(query);

    return this.usersService.getUserPatients(userPayload.id, {
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions,
    });
  }

  @Get('/patient/all')
  @HttpCode(HttpStatus.OK)
  async getAllUserPatients(
    @Query() query: FindAllUserPatientsDto,
  ): Promise<PaginationResponseDto<UserPatient>> {
    const paginationOptions = getPagination(query);

    return this.usersService.getAllUserPatients({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions,
    });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @Permissions(PermissionsEnum.SOFT_DELETE_USER)
  @UseGuards(PermissionsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: User['id']): Promise<void> {
    return this.usersService.remove(id);
  }
}
