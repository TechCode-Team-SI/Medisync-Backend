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
  Request,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Article } from './domain/article';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllArticlesDto } from './dto/find-all-articles.dto';
import { exceptionResponses } from 'src/articles/articles.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Articles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Article,
  })
  create(@Request() request, @Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto, request.user.id);
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
