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
import { ArticleCategoriesService } from './article-categories.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleCategory } from './domain/article-category';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllArticleCategoriesDto } from './dto/find-all-article-categories.dto';
import { exceptionResponses } from 'src/article-categories/article-categories.messages';
import { getPagination } from 'src/utils/get-pagination';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@ApiTags('Articlecategories')
@ApiBearerAuth()
@Controller({
  path: 'article-categories',
  version: '1',
})
export class ArticleCategoriesController {
  constructor(
    private readonly articleCategoriesService: ArticleCategoriesService,
  ) {}

  @Post()
  @Permissions(PermissionsEnum.MANAGE_ARTICLES)
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    type: ArticleCategory,
  })
  create(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoriesService.create(createArticleCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(ArticleCategory),
  })
  async findAll(
    @Query() query: FindAllArticleCategoriesDto,
  ): Promise<PaginationResponseDto<ArticleCategory>> {
    const paginationOptions = getPagination(query);

    return this.articleCategoriesService.findAllWithPagination({
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
    type: ArticleCategory,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.articleCategoriesService.findOne(id);

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
    type: ArticleCategory,
  })
  update(
    @Param('id') id: string,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoriesService.update(id, updateArticleCategoryDto);
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
    return this.articleCategoriesService.remove(id);
  }
}
