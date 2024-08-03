import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exceptionResponses } from './articles.messages';
import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './infrastructure/persistence/article.repository';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private usersService: UsersService,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses);
    }

    const data = {
      ...createArticleDto,
      updatedBy: user,
    };
    return this.articleRepository.create(data);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.articleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Article['id']) {
    return this.articleRepository.findById(id);
  }

  update(id: Article['id'], updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  remove(id: Article['id']) {
    return this.articleRepository.remove(id);
  }
}
