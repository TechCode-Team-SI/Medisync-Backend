import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exceptionResponses } from './diagnostics.messages';
import { Diagnostic } from './domain/diagnostic';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { DiagnosticRepository } from './infrastructure/persistence/diagnostic.repository';

@Injectable()
export class DiagnosticsService {
  constructor(
    private readonly diagnosticRepository: DiagnosticRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createDiagnosticDto: CreateDiagnosticDto, userId: string) {
    const user = await this.usersService.findById(userId, { minimal: true });
    if (!user) {
      throw new UnprocessableEntityException(
        exceptionResponses.CurrentUserNotFound,
      );
    }

    const clonedPayload = {
      ...createDiagnosticDto,
      madeBy: user,
    };
    return this.diagnosticRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.diagnosticRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Diagnostic['id'], options?: findOptions) {
    return this.diagnosticRepository.findById(id, options);
  }
}
