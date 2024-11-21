import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { NotificationUser } from '../../domain/notification-user';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { SortNotificationUsersDto } from 'src/notification-users/dto/find-all-notification-users.dto';

export abstract class NotificationUserRepository extends BaseRepository {
  abstract create(
    data: Omit<NotificationUser, 'id' | 'user' | 'createdAt' | 'updatedAt'>,
  ): Promise<NotificationUser>;

  abstract createMany(
    data: Omit<NotificationUser, 'id' | 'user' | 'createdAt' | 'updatedAt'>[],
  ): Promise<NotificationUser[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortNotificationUsersDto[] | null;
  }): Promise<PaginationResponseDto<NotificationUser>>;

  abstract findAll({
    options,
    sortOptions,
  }: {
    options?: findOptions;
    sortOptions?: SortNotificationUsersDto[] | null;
  }): Promise<NotificationUser[]>;

  abstract findMany(
    ids: NotificationUser['id'][],
    {
      options,
      sortOptions,
    }: {
      options?: findOptions & { withUser: boolean };
      sortOptions?: SortNotificationUsersDto[] | null;
    },
  ): Promise<NotificationUser[]>;

  abstract findById(
    id: NotificationUser['id'],
    options?: findOptions,
  ): Promise<NullableType<NotificationUser>>;

  abstract update(
    id: NotificationUser['id'],
    payload: DeepPartial<NotificationUser>,
  ): Promise<NotificationUser | null>;

  abstract updateManyByUserId(
    id: string,
    payload: DeepPartial<NotificationUser>,
  ): Promise<boolean>;

  abstract updateMany(
    id: string[],
    payload: DeepPartial<NotificationUser>,
  ): Promise<boolean>;

  abstract remove(id: NotificationUser['id']): Promise<void>;
}
