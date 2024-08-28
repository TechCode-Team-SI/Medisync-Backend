import { ConfirmEmailToken } from 'src/auth/domain/confirm-email-token';
import { NullableType } from '../../../utils/types/nullable.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class ConfirmEmailTokenRepository extends BaseRepository {
  abstract create(
    email: ConfirmEmailToken['email'],
    expiresAt: Date,
  ): Promise<ConfirmEmailToken>;

  abstract findByEmail(
    email: ConfirmEmailToken['email'],
  ): Promise<NullableType<ConfirmEmailToken>>;

  abstract findOne(
    searchData: Pick<ConfirmEmailToken, 'code' | 'email'>,
  ): Promise<NullableType<ConfirmEmailToken>>;

  abstract deleteById(id: ConfirmEmailToken['id']): Promise<ConfirmEmailToken>;
}
