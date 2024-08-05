import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ConfirmEmailToken } from '../../../../domain/confirm-email-token';
import { ConfirmEmailTokenRepository } from '../../confirm-email-token.repository';
import { ConfirmEmailTokenEntity } from '../entities/confirm-email-token.entity';
import { ConfirmEmailTokenMapper } from '../mappers/confirm-email-token.mapper';
import { exceptionResponses } from 'src/auth/auth.messages';
import { genOTPCode } from 'src/utils/utils';

@Injectable()
export class ConfirmEmailTokenRelationalRepository
  implements ConfirmEmailTokenRepository
{
  constructor(
    @InjectRepository(ConfirmEmailTokenEntity)
    private readonly ConfirmEmailTokenRepository: Repository<ConfirmEmailTokenEntity>,
  ) {}

  async create(
    email: ConfirmEmailToken['email'],
    expiresAt: Date,
  ): Promise<ConfirmEmailToken> {
    const code = genOTPCode();
    const ConfirmEmailToken = this.ConfirmEmailTokenRepository.create({
      email,
      code,
      expiresAt,
    });

    await this.ConfirmEmailTokenRepository.save(ConfirmEmailToken);

    return ConfirmEmailTokenMapper.toDomain(ConfirmEmailToken);
  }

  async findByEmail(
    email: ConfirmEmailToken['email'],
  ): Promise<NullableType<ConfirmEmailToken>> {
    const ConfirmEmailToken = await this.ConfirmEmailTokenRepository.findOne({
      where: { email },
    });

    return ConfirmEmailToken
      ? ConfirmEmailTokenMapper.toDomain(ConfirmEmailToken)
      : null;
  }

  async findOne({
    code,
    email,
  }: Pick<ConfirmEmailToken, 'code' | 'email'>): Promise<
    NullableType<ConfirmEmailToken>
  > {
    const ConfirmEmailToken = await this.ConfirmEmailTokenRepository.findOne({
      where: { code, email },
    });

    return ConfirmEmailToken
      ? ConfirmEmailTokenMapper.toDomain(ConfirmEmailToken)
      : null;
  }

  async deleteById(id: ConfirmEmailToken['id']): Promise<ConfirmEmailToken> {
    const confirmEmailToken = await this.ConfirmEmailTokenRepository.findOne({
      where: { id },
    });

    if (!confirmEmailToken) {
      throw new UnprocessableEntityException(
        exceptionResponses.InvalidConfirmEmail,
      );
    }

    await this.ConfirmEmailTokenRepository.delete(id);

    return ConfirmEmailTokenMapper.toDomain(confirmEmailToken);
  }
}
