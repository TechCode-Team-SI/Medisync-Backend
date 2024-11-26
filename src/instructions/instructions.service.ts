import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Instructions } from './domain/instructions';
import { CreateInstructionsDto } from './dto/create-instructions.dto';
import { UpdateInstructionsDto } from './dto/update-instructions.dto';
import { InstructionsRepository } from './infrastructure/persistence/instructions.repository';
import { exceptionResponses } from './instructions.messages';

@Injectable()
export class InstructionsService {
  constructor(
    private readonly instructionsRepository: InstructionsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createInstructionsDto: CreateInstructionsDto, userId: string) {
    const user = await this.usersService.findById(userId, { minimal: true });
    if (!user) {
      throw new UnprocessableEntityException(
        exceptionResponses.CurrentUserNotFound,
      );
    }

    const clonedPayload = {
      ...createInstructionsDto,
      madeBy: user,
    };
    return this.instructionsRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.instructionsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Instructions['id'], options?: findOptions) {
    return this.instructionsRepository.findById(id, options);
  }

  update(id: Instructions['id'], updateInstructionsDto: UpdateInstructionsDto) {
    return this.instructionsRepository.update(id, updateInstructionsDto);
  }

  remove(id: Instructions['id']) {
    return this.instructionsRepository.remove(id);
  }

  findOneByRequest(requestId: string) {
    return this.instructionsRepository.findByRequestId(requestId);
  }
}
