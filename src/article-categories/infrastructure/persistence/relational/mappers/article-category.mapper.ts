import { ArticleCategory } from '../../../../domain/article-category';
import { ArticleCategoryEntity } from '../entities/article-category.entity';

export class ArticleCategoryMapper {
  static toDomain(raw: ArticleCategoryEntity): ArticleCategory {
    const domainEntity = new ArticleCategory();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ArticleCategory): ArticleCategoryEntity {
    const persistenceEntity = new ArticleCategoryEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
