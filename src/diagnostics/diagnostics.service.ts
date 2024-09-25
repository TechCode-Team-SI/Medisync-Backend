import { SymptomsService } from './../symptoms/symptoms.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exceptionResponses } from './diagnostics.messages';
import { Diagnostic } from './domain/diagnostic';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { DiagnosticRepository } from './infrastructure/persistence/diagnostic.repository';
import { IllnessesService } from 'src/illnesses/illnesses.service';
import { InjuriesService } from 'src/injuries/injuries.service';
import { TreatmentsService } from 'src/treatments/treatments.service';

@Injectable()
export class DiagnosticsService {
  constructor(
    private readonly diagnosticRepository: DiagnosticRepository,
    private readonly usersService: UsersService,
    private readonly illnessesService: IllnessesService,
    private readonly injuriesService: InjuriesService,
    private readonly symptomsService: SymptomsService,
    private readonly treatmentsService: TreatmentsService,
  ) {}

  async create(createDiagnosticDto: CreateDiagnosticDto, userId: string) {
    const user = await this.usersService.findById(userId, { minimal: true });
    if (!user) {
      throw new UnprocessableEntityException(
        exceptionResponses.CurrentUserNotFound,
      );
    }

    const illnesses = await this.illnessesService.findMany(
      createDiagnosticDto.illnesses,
    );

    const injuries = await this.injuriesService.findMany(
      createDiagnosticDto.injuries,
    );

    const symptoms = await this.symptomsService.findMany(
      createDiagnosticDto.symptoms,
    );

    const treatments = await this.treatmentsService.findMany(
      createDiagnosticDto.treatments,
    );

    const clonedPayload = {
      ...createDiagnosticDto,
      madeBy: user,
      illnesses,
      injuries,
      symptoms,
      treatments,
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
