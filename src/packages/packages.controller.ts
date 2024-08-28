import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import {
  PaginationResponse,
  PaginationResponseDto,
} from 'src/utils/dto/pagination-response.dto';
import { getPagination } from 'src/utils/get-pagination';
import { Package } from './domain/package';
import { ApplyPackagesDto } from './dto/apply-packages.dto';
import { FindAllPackagesDto } from './dto/find-all-packages.dto';
import { exceptionResponses } from './packages.messages';
import { PackagesService } from './packages.service';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@ApiTags('Packages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'packages',
  version: '1',
})
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Package),
  })
  async findAll(
    @Query() query: FindAllPackagesDto,
  ): Promise<PaginationResponseDto<Package>> {
    const paginationOptions = getPagination(query);

    return this.packagesService.findAllWithPagination({ paginationOptions });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Package,
  })
  async findOne(@Param('id') id: string) {
    const role = await this.packagesService.findOne(id);
    if (!role) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    return role;
  }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ApiOkResponse()
  async seed(
    @Body() applyPackagesDto: ApplyPackagesDto,
  ): Promise<SuccessResponseDto> {
    await this.packagesService.seed(...applyPackagesDto.slugs);
    return { success: true };
  }
}
