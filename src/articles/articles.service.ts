import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exceptionResponses } from './articles.messages';
import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilterArticleDto, SortArticleDto } from './dto/find-all-articles.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './infrastructure/persistence/article.repository';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private readonly filesService: FilesService,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses);
    }

    const clonedPayload: Omit<Article, 'id' | 'createdAt' | 'updatedAt'> = {
      ...createArticleDto,
      updatedBy: user,
    };

    if (createArticleDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        createArticleDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.AvatarNotExist,
        );
      }
      clonedPayload.image = fileObject;
    }

    const result = await this.articleRepository.create(clonedPayload);

    await this.notificationsService.createForAllMobileUsers({
      title: 'Nuevo Articulo disponible!',
      content: `Hay un nuevo articulo medico disponible en nuestra plataforma: ${clonedPayload.title}`,
    });

    return result;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortArticleDto[] | null;
    filterOptions?: FilterArticleDto | null;
  }) {
    return this.articleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Article['id'], options?: findOptions) {
    return this.articleRepository.findById(id, options);
  }

  async update(id: Article['id'], updateArticleDto: UpdateArticleDto) {
    const clonedPayload: Partial<Article> = {
      ...updateArticleDto,
    };

    if (updateArticleDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        updateArticleDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.AvatarNotExist,
        );
      }
      clonedPayload.image = fileObject;
    }

    return this.articleRepository.update(id, clonedPayload);
  }

  remove(id: Article['id']) {
    return this.articleRepository.remove(id);
  }
}
