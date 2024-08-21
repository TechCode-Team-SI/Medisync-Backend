import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Selection } from 'src/field-questions/domain/selection';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import { RequestTemplatesService } from 'src/request-templates/request-templates.service';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { UsersService } from 'src/users/users.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Request } from './domain/request';
import { RequestValue } from './domain/request-value';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestRepository } from './infrastructure/persistence/request.repository';
import { RequestStatusEnum } from './requests.enum';
import { exceptionResponses } from './requests.messages';
@Injectable()
export class RequestsService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestTemplateService: RequestTemplatesService,
    private readonly specialtyRepository: SpecialtiesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    const {
      requestTemplate,
      requestedSpecialty,
      requestValues,
      requestedMedic,
    } = createRequestDto;

    const foundRequestTemplate = await this.requestTemplateService.findOne(
      requestTemplate.id,
    );
    if (!foundRequestTemplate) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestTemplateNotExists,
      );
    }

    const foundSpecialty = await this.specialtyRepository.findOne(
      requestedSpecialty.id,
      { minimal: true },
    );
    if (!foundSpecialty) {
      throw new UnprocessableEntityException(
        exceptionResponses.SpecialtyNotExists,
      );
    }

    const foundMedic = await this.usersService.findById(requestedMedic.id, {
      minimal: true,
    });
    if (!foundMedic) {
      throw new UnprocessableEntityException(exceptionResponses.MedicNotExists);
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
    };

    return this.requestRepository.create(clonedPayload);
  }

  findAllMinimalWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.requestRepository.findAllMinimalWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOneDetailed(id: Request['id']) {
    return this.requestRepository.findByIdFormatted(id);
  }
}
