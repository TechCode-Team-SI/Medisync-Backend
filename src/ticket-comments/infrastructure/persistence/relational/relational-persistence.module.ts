import { Module } from '@nestjs/common';
import { TicketCommentRepository } from '../ticket-comment.repository';
import { TicketCommentRelationalRepository } from './repositories/ticket-comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCommentEntity } from './entities/ticket-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketCommentEntity])],
  providers: [
    {
      provide: TicketCommentRepository,
      useClass: TicketCommentRelationalRepository,
    },
  ],
  exports: [TicketCommentRepository],
})
export class RelationalTicketCommentPersistenceModule {}
