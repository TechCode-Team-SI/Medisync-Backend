import { ApiProperty } from '@nestjs/swagger';
import { ArticleCategory } from 'src/article-categories/domain/article-category';
import { FileDto } from 'src/files/dto/file.dto';
import { User } from 'src/users/domain/user';

export class Article {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image?: FileDto | null;

  @ApiProperty({ type: ArticleCategory, isArray: true })
  categories: ArticleCategory[];

  @ApiProperty()
  updatedBy: User;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
