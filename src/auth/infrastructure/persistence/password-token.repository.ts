import { PasswordToken } from 'src/auth/domain/password-token';
import { NullableType } from '../../../utils/types/nullable.type';

export abstract class PasswordTokenRepository {
  abstract create(
    email: PasswordToken['email'],
    expiresAt: Date,
  ): Promise<PasswordToken>;

  abstract findByEmail(
    email: PasswordToken['email'],
  ): Promise<NullableType<PasswordToken>>;

  abstract findOne(
    searchData: Pick<PasswordToken, 'code' | 'email'>,
  ): Promise<NullableType<PasswordToken>>;

  abstract deleteById(id: PasswordToken['id']): Promise<PasswordToken>;
}
