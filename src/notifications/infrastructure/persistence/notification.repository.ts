import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Notification } from '../../domain/notification';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterNotificationDto,
  SortNotificationsDto,
} from 'src/notifications/dto/find-all-notifications.dto';

export abstract class NotificationRepository extends BaseRepository {
  abstract create(
    data: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Notification>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortNotificationsDto[] | null;
    filterOptions?: FilterNotificationDto;
  }): Promise<PaginationResponseDto<Notification>>;

  abstract findById(
    id: Notification['id'],
    options?: findOptions,
  ): Promise<NullableType<Notification>>;

  abstract update(
    id: Notification['id'],
    payload: DeepPartial<Notification>,
  ): Promise<Notification | null>;

  abstract remove(id: Notification['id']): Promise<void>;
}
