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
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Permission } from './domain/permission';
import { FindAllpermissionsDto } from './dto/find-all-permissions.dto';
import { PermissionsService } from './permissions.service';
import { exceptionResponses } from './permissions.messages';

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
    type: InfinityPaginationResponse(Permission),
  })
  async findAll(
    @Query() query: FindAllpermissionsDto,
  ): Promise<InfinityPaginationResponseDto<Permission>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.PermissionsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
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
