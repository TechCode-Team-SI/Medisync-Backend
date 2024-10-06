import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Notification } from '../domain/notification';
import { NotificationTypeEnum } from '../notifications.enum';

export class FilterNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  @Type(() => Boolean)
  read?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationTypeEnum)
  type?: NotificationTypeEnum;
}

export class SortNotificationsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Notification;

  @ApiProperty()
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortNotificationsDto))
  @ValidateNested({ each: true })
  @Type(() => SortNotificationsDto)
  sort?: SortNotificationsDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterNotificationDto))
  @ValidateNested()
  @Type(() => FilterNotificationDto)
  filters?: FilterNotificationDto | null;
}
