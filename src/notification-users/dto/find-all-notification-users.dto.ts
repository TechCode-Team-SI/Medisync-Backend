import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { NotificationUser } from '../domain/notification-user';

export class SortNotificationUsersDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof NotificationUser;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllNotificationUsersDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortNotificationUsersDto))
  @ValidateNested({ each: true })
  @Type(() => SortNotificationUsersDto)
  sort?: SortNotificationUsersDto[] | null;
}
