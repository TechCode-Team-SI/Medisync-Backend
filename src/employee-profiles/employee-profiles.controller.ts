import {
  Controller,
  Get,
  //Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeProfilesService } from './employee-profiles.service';
//import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import {
  ApiBearerAuth,
  //ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeProfile } from './domain/employee-profile';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllEmployeeProfilesDto } from './dto/find-all-employee-profiles.dto';
import { exceptionResponses } from 'src/employee-profiles/employee-profiles.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Employeeprofiles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'employee-profiles',
  version: '1',
})
export class EmployeeProfilesController {
  constructor(
    private readonly employeeProfilesService: EmployeeProfilesService,
  ) {}

  /*
  @Post()
  @ApiCreatedResponse({
    type: EmployeeProfile,
  })
  create(@Body() createEmployeeProfileDto: CreateEmployeeProfileDto) {
    return this.employeeProfilesService.create(createEmployeeProfileDto);
  }
*/
  @Get()
  @ApiOkResponse({
    type: PaginationResponse(EmployeeProfile),
  })
  async findAll(
    @Query() query: FindAllEmployeeProfilesDto,
  ): Promise<PaginationResponseDto<EmployeeProfile>> {
    const paginationOptions = getPagination(query);

    return this.employeeProfilesService.findAllWithPagination({
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
    type: EmployeeProfile,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.employeeProfilesService.findOne(id);

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
    type: EmployeeProfile,
  })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeProfileDto: UpdateEmployeeProfileDto,
  ) {
    return this.employeeProfilesService.update(id, updateEmployeeProfileDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.employeeProfilesService.remove(id);
  }
}
