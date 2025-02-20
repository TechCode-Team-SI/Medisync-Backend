import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ArticleCategory } from 'src/article-categories/domain/article-category';
import { FilesService } from 'src/files/files.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { UsersService } from 'src/users/users.service';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { ArticleCategoriesService } from '../article-categories/article-categories.service';
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
    private readonly filesService: FilesService,
    private readonly articleCategoriesService: ArticleCategoriesService,
    @InjectQueue(QueueName.NOTIFICATION) private notificationQueue: Queue,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses);
    }
    const categories = await this.articleCategoriesService.findMany(
      createArticleDto.categories,
    );

    const clonedPayload: Omit<Article, 'id' | 'createdAt' | 'updatedAt'> = {
      ...createArticleDto,
      updatedBy: user,
      categories: categories,
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

    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.article.create.title,
          content: MessagesContent.article.create.content(result.id),
          type: MessagesContent.article.create.type,
        },
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
      },
    );

    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_MOBILE,
      {
        title: MessagesContent.article.userNoti.title,
        content: MessagesContent.article.userNoti.content(clonedPayload.title),
      },
    );

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
      categories: updateArticleDto.categories?.map((catId) => {
        const obj = new ArticleCategory();
        obj.id = catId;
        return obj;
      }),
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
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.article.updated.title,
          content: MessagesContent.article.updated.content(id),
          type: MessagesContent.article.updated.type,
        },
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
      },
    );
    return this.articleRepository.update(id, clonedPayload);
  }

  async remove(id: Article['id']) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.article.remove.title,
          content: MessagesContent.article.remove.content(id),
          type: MessagesContent.article.remove.type,
        },
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
      },
    );
    return this.articleRepository.remove(id);
  }
}
