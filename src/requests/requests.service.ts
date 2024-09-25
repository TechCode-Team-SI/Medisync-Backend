import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DiagnosticsService } from 'src/diagnostics/diagnostics.service';
import { CreateDiagnosticDto } from 'src/diagnostics/dto/create-diagnostic.dto';
import { Selection } from 'src/field-questions/domain/selection';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import { CreateInstructionsDto } from 'src/instructions/dto/create-instructions.dto';
import { InstructionsService } from 'src/instructions/instructions.service';
import { RequestTemplatesService } from 'src/request-templates/request-templates.service';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Request } from './domain/request';
import { RequestValue } from './domain/request-value';
import { CreateRequestWithReferenceDto } from './dto/create-request-with-reference.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { FilterRequestDto, SortRequestDto } from './dto/find-all-requests.dto';
import { FinishRequestDto } from './dto/finish-request.dto';
import { RequestRepository } from './infrastructure/persistence/request.repository';
import { RequestStatusEnum } from './requests.enum';
import { exceptionResponses } from './requests.messages';
@Injectable()
export class RequestsService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestTemplateService: RequestTemplatesService,
    private readonly specialtiesRepository: SpecialtiesService,
    private readonly usersService: UsersService,
    private readonly diagnosticsService: DiagnosticsService,
    private readonly instructionsService: InstructionsService,
  ) {}

  async create(
    createRequestDto: CreateRequestDto &
      Pick<Partial<CreateRequestWithReferenceDto>, 'referredContent'>,
    madeById: string,
  ) {
    const {
      requestTemplate,
      requestedSpecialty,
      requestValues,
      requestedMedic,
      referredContent,
    } = createRequestDto;

    const foundUser = await this.usersService.findById(madeById, {
      minimal: true,
    });

    if (!foundUser) {
      throw new UnprocessableEntityException(
        exceptionResponses.CurrentUserNotExists,
      );
    }

    const foundRequestTemplate = await this.requestTemplateService.findOne(
      requestTemplate.id,
    );
    if (!foundRequestTemplate) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestTemplateNotExists,
      );
    }

    const foundSpecialty = await this.specialtiesRepository.findOne(
      requestedSpecialty.id,
      { minimal: true },
    );
    if (!foundSpecialty) {
      throw new UnprocessableEntityException(
        exceptionResponses.SpecialtyNotExists,
      );
    }

    const foundMedic = await this.usersService.findById(requestedMedic.id, {
      withProfile: true,
      withSpecialty: true,
    });
    if (!foundMedic) {
      throw new UnprocessableEntityException(exceptionResponses.MedicNotExists);
    }
    if (!foundMedic.employeeProfile) {
      throw new UnprocessableEntityException(
        exceptionResponses.SelectedMedicNotAllowed,
      );
    }

    const isMedicInRequestedSpecialty =
      foundMedic.employeeProfile.specialties?.some(
        (specialty) => specialty.id === requestedSpecialty.id,
      );
    if (!isMedicInRequestedSpecialty) {
      throw new UnprocessableEntityException(
        exceptionResponses.SelectedMedicNotAllowed,
      );
    }

    const requestValuesUpdated = foundRequestTemplate.fields.reduce<
      RequestValue[]
    >((acc, { fieldQuestion }) => {
      const data = requestValues.find(
        (value) => value.fieldQuestion.id === fieldQuestion.id,
      );
      if (!data) {
        if (fieldQuestion.isRequired) {
          throw new UnprocessableEntityException(
            exceptionResponses.InvalidAnswer,
          );
        }
        return acc;
      }

      const requestValue = new RequestValue();
      requestValue.fieldQuestion = fieldQuestion;

      switch (fieldQuestion.type) {
        case FieldQuestionTypeEnum.SELECTION:
          if (!data.selections) {
            throw new UnprocessableEntityException(
              exceptionResponses.InvalidAnswer,
            );
          }
          const isMultiple = fieldQuestion.selectionConfig?.isMultiple;
          if (!isMultiple) {
            if (data.selections.length !== 1) {
              throw new UnprocessableEntityException(
                exceptionResponses.InvalidAnswer,
              );
            }
            const selectionId = data.selections[0].id;
            const selection = new Selection();
            selection.id = selectionId;
            requestValue.selections = [selection];
          } else {
            const selections = data.selections.map((selection) => {
              const selectionId = selection.id;
              const currentSelection = new Selection();
              currentSelection.id = selectionId;
              return currentSelection;
            });
            requestValue.selections = selections;
          }
          break;
        case FieldQuestionTypeEnum.NUMBER:
          if (isNaN(Number(data.value))) {
            throw new UnprocessableEntityException(
              exceptionResponses.InvalidAnswer,
            );
          }
          requestValue.value = data.value;
          break;
        case FieldQuestionTypeEnum.TEXT:
        default:
          requestValue.value = data.value;
      }

      return [...acc, requestValue];
    }, []);

    const clonedPayload = {
      ...createRequestDto,
      status: RequestStatusEnum.PENDING,
      requestTemplate: foundRequestTemplate,
      requestedSpecialty: foundSpecialty,
      requestedMedic: foundMedic,
      requestValues: requestValuesUpdated,
      referredContent: referredContent,
      referredBy: referredContent ? foundMedic : undefined,
      madeBy: foundUser,
    };

    return this.requestRepository.create(clonedPayload);
  }

  findAllMinimalWithPagination({
    paginationOptions,
    filterOptions,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    filterOptions?: FilterRequestDto | null;
    sortOptions?: SortRequestDto[] | null;
  }) {
    return this.requestRepository.findAllMinimalWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filterOptions,
      sortOptions,
    });
  }

  findOneDetailed(id: Request['id']) {
    return this.requestRepository.findByIdFormatted(id);
  }

  findOne(
    id: Request['id'],
    options?: findOptions & {
      withSpecialty?: boolean;
      withMedic?: boolean;
      withMadeBy?: boolean;
    },
  ) {
    return this.requestRepository.findById(id, options);
  }

  findRating(id: Request['id']) {
    return this.requestRepository.findRating(id);
  }

  updateStatus(id: Request['id'], status: RequestStatusEnum) {
    return this.requestRepository.update(id, { status });
  }

  async attend(requestId: string, medicId: string) {
    const request = await this.requestRepository.findById(requestId, {
      withMedic: true,
      withSpecialty: true,
    });
    if (!request) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (request.requestedMedic.id !== medicId) {
      throw new ForbiddenException(exceptionResponses.CurrentMedicNotAllowed);
    }
    if (request.status !== RequestStatusEnum.PENDING) {
      throw new UnprocessableEntityException(
        exceptionResponses.StatusNotPending,
      );
    }

    return this.updateStatus(requestId, RequestStatusEnum.ATTENDING);
  }

  async finish(
    requestId: string,
    medicId: string,
    finishRequestDto: FinishRequestDto,
  ) {
    const request = await this.requestRepository.findById(requestId, {
      withSpecialty: true,
      withMedic: true,
    });
    if (!request) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (request.requestedMedic.id !== medicId) {
      throw new ForbiddenException(exceptionResponses.CurrentMedicNotAllowed);
    }
    if (request.status !== RequestStatusEnum.ATTENDING) {
      throw new UnprocessableEntityException(
        exceptionResponses.StatusNotAttending,
      );
    }
    const specialty = await this.specialtiesRepository.findOne(
      request.requestedSpecialty.id,
      {
        minimal: true,
      },
    );
    if (!specialty) {
      throw new UnprocessableEntityException(
        exceptionResponses.SpecialtyNotExists,
      );
    }

    const createDiagnosticDto: CreateDiagnosticDto = {
      description: finishRequestDto.diagnostic.description,
      request,
      specialty,
      illnesses: finishRequestDto.diagnostic.illnesses,
      injuries: finishRequestDto.diagnostic.injuries,
      symptoms: finishRequestDto.diagnostic.symptoms,
      treatments: finishRequestDto.diagnostic.treatments,
    };

    const createInstructionsDto: CreateInstructionsDto = {
      description: finishRequestDto.instructions,
      request,
      specialty,
    };

    await this.diagnosticsService.create(createDiagnosticDto, medicId);
    await this.instructionsService.create(createInstructionsDto, medicId);
    return this.updateStatus(requestId, RequestStatusEnum.COMPLETED);
  }
}
