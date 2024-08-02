import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  PaginationResponse,
  PaginationResponseDto,
} from 'src/utils/dto/pagination-response.dto';
import { Permission } from './domain/permission';
import { FindAllpermissionsDto } from './dto/find-all-permissions.dto';
import { exceptionResponses } from './permissions.messages';
import { PermissionsService } from './permissions.service';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'permissions',
  version: '1',
})
export class permissionsController {
  constructor(private readonly PermissionsService: PermissionsService) {}

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Permission),
  })
  async findAll(
    @Query() query: FindAllpermissionsDto,
  ): Promise<PaginationResponseDto<Permission>> {
    const paginationOptions = getPagination(query);

    return this.PermissionsService.findAllWithPagination({ paginationOptions });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Permission,
  })
  async findOne(@Param('id') id: string) {
    const permission = await this.PermissionsService.findOne(id);
    if (!permission) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    return permission;
  }
}
