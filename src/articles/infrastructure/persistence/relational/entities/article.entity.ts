import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { ArticleCategoryEntity } from 'src/article-categories/infrastructure/persistence/relational/entities/article-category.entity';

@Entity({
  name: 'article',
})
export class ArticleEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    type: () => FileEntity,
  })
  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image?: FileEntity | null;

  @ApiProperty()
  @ManyToMany(() => ArticleCategoryEntity)
  @JoinTable({ name: 'article_category' })
  categories: ArticleCategoryEntity[];

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.articles)
  updatedBy: UserEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
