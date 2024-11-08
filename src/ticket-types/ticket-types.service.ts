import { Injectable } from '@nestjs/common';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import { TicketTypeRepository } from './infrastructure/persistence/ticket-type.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { TicketType } from './domain/ticket-type';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class TicketTypesService {
  constructor(private readonly ticketTypeRepository: TicketTypeRepository) {}

  create(createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypeRepository.create(createTicketTypeDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.ticketTypeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: TicketType['id'], options?: findOptions) {
    return this.ticketTypeRepository.findById(id, options);
  }

  update(id: TicketType['id'], updateTicketTypeDto: UpdateTicketTypeDto) {
    return this.ticketTypeRepository.update(id, updateTicketTypeDto);
  }

  remove(id: TicketType['id']) {
    return this.ticketTypeRepository.remove(id);
  }
}
