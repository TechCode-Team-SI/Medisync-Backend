import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PasswordToken } from '../../../../domain/password-token';
import { PasswordTokenRepository } from '../../password-token.repository';
import { PasswordTokenEntity } from '../entities/password-token.entity';
import { PasswordTokenMapper } from '../mappers/password-token.mapper';
import { exceptionResponses } from 'src/auth/auth.messages';
import { genOTPCode } from 'src/utils/utils';

@Injectable()
export class PasswordTokenRelationalRepository
  implements PasswordTokenRepository
{
  constructor(
    @InjectRepository(PasswordTokenEntity)
    private readonly PasswordTokenRepository: Repository<PasswordTokenEntity>,
  ) {}

  async create(
    email: PasswordToken['email'],
    expiresAt: Date,
  ): Promise<PasswordToken> {
    const code = genOTPCode();
    const PasswordToken = this.PasswordTokenRepository.create({
      email,
      code,
      expiresAt,
    });

    await this.PasswordTokenRepository.save(PasswordToken);

    return PasswordTokenMapper.toDomain(PasswordToken);
  }

  async findByEmail(
    email: PasswordToken['email'],
  ): Promise<NullableType<PasswordToken>> {
    const PasswordToken = await this.PasswordTokenRepository.findOne({
      where: { email },
    });

    return PasswordToken ? PasswordTokenMapper.toDomain(PasswordToken) : null;
  }

  async findOne({
    code,
    email,
  }: Pick<PasswordToken, 'code' | 'email'>): Promise<
    NullableType<PasswordToken>
  > {
    const PasswordToken = await this.PasswordTokenRepository.findOne({
      where: { code, email },
    });

    return PasswordToken ? PasswordTokenMapper.toDomain(PasswordToken) : null;
  }

  async deleteById(id: PasswordToken['id']): Promise<PasswordToken> {
    const passwordToken = await this.PasswordTokenRepository.findOne({
      where: { id },
    });

    if (!passwordToken) {
      throw new UnprocessableEntityException(
        exceptionResponses.InvalidPasswordReset,
      );
    }

    await this.PasswordTokenRepository.delete(id);

    return PasswordTokenMapper.toDomain(passwordToken);
  }
}
