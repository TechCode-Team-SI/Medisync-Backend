import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { Article } from '../../../../domain/article';
import { ArticleEntity } from '../entities/article.entity';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { ArticleCategoryMapper } from 'src/article-categories/infrastructure/persistence/relational/mappers/article-category.mapper';

export class ArticleMapper {
  static toDomain(raw: ArticleEntity): Article {
    const domainEntity = new Article();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    if (raw.image) {
      domainEntity.image = FileMapper.toDomain(raw.image);
    }
    if (raw.updatedBy) {
      domainEntity.updatedBy = UserMapper.toDomain(raw.updatedBy);
    }
    if (raw.categories) {
      domainEntity.categories = raw.categories.map((category) =>
        ArticleCategoryMapper.toDomain(category),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Article): ArticleEntity {
    const persistenceEntity = new ArticleEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    if (domainEntity.image) {
      persistenceEntity.image = FileMapper.toPersistence(domainEntity.image);
    }
    if (domainEntity.updatedBy) {
      persistenceEntity.updatedBy = UserMapper.toPersistence(
        domainEntity.updatedBy,
      );
    }
    if (domainEntity) {
      persistenceEntity.categories = domainEntity.categories.map((category) =>
        ArticleCategoryMapper.toPersistence(category),
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
