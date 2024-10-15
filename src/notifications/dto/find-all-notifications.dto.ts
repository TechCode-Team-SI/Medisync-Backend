import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderEnum } from 'src/common/order.enum';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ApiSortProperty } from 'src/utils/decorators/sort-property';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { NotificationTypeEnum } from '../notifications.enum';

export class FilterNotificationDto {
  @ApiFilterProperty({ type: Boolean })
  @IsOptional()
  @IsBooleanString()
  @Type(() => Boolean)
  read?: boolean;

  @ApiFilterProperty()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiFilterProperty({ type: String, enum: NotificationTypeEnum })
  @IsOptional()
  @IsEnum(NotificationTypeEnum)
  type?: NotificationTypeEnum;
}

export class SortNotificationsDto {
  @ApiSortProperty({ enum: ['createdAt', 'title', 'type'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FindAllNotificationsDto {
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

  @ApiPropertyOptional({ type: () => SortNotificationsDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortNotificationsDto))
  @ValidateNested({ each: true })
  @Type(() => SortNotificationsDto)
  sort?: SortNotificationsDto[] | null;

  @ApiPropertyOptional({ type: () => FilterNotificationDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterNotificationDto))
  @ValidateNested()
  @Type(() => FilterNotificationDto)
  filters?: FilterNotificationDto | null;
}
