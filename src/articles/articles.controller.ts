import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
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
import { exceptionResponses } from 'src/articles/articles.messages';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { ArticlesService } from './articles.service';
import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticlesDto } from './dto/find-all-articles.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('Articles')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Permissions(PermissionsEnum.MANAGE_ARTICLES)
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(TransactionInterceptor)
  @ApiCreatedResponse({
    type: Article,
  })
  create(
    @Me() userPayload: JwtPayloadType,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(createArticleDto, userPayload.id);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Article),
  })
  async findAll(
    @Query() query: FindAllArticlesDto,
  ): Promise<PaginationResponseDto<Article>> {
    const paginationOptions = getPagination(query);

    return this.articlesService.findAllWithPagination({
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
    type: Article,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.articlesService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @Permissions(PermissionsEnum.MANAGE_ARTICLES)
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Article,
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @Permissions(PermissionsEnum.MANAGE_ARTICLES)
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
