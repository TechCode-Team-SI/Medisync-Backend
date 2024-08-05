import { ConfirmEmailToken } from 'src/auth/domain/confirm-email-token';
import { NullableType } from '../../../utils/types/nullable.type';

export abstract class ConfirmEmailTokenRepository {
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
