import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
import { FieldQuestionsService } from 'src/field-questions/field-questions.service';
import { RequestTemplatesService } from 'src/request-templates/request-templates.service';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Package } from './domain/package';
import { PackageRepository } from './infrastructure/persistence/package.repository';
import { exceptionResponses } from './packages.messages';
import { fieldQuestionsModule } from './seeds/field-questions';
import { InstallationModule, ModuleInstallationSteps } from './seeds/type';
import { SortPackageDto } from './dto/find-all-packages.dto';

@Injectable()
export class PackagesService {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly specialtiesService: SpecialtiesService,
    private readonly fieldQuestionsService: FieldQuestionsService,
    private readonly requestTemplatesService: RequestTemplatesService,
  ) {}

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortPackageDto[] | null;
  }) {
    return this.packageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: Package['id'], options?: findOptions) {
    return this.packageRepository.findById(id, options);
  }

  async seed(...slugs: string[]) {
    const systemPrefix = this.configService.getOrThrow('app.installPrefix', {
      infer: true,
    });
    const packagesMetadata = await this.packageRepository.findAllBySlug(slugs);
    if (packagesMetadata?.length !== slugs.length) {
      throw new UnprocessableEntityException(exceptionResponses.NotFound);
    }

    const installedPackages = packagesMetadata.reduce<string[]>((acc, pkg) => {
      if (pkg.applied) return [...acc, pkg.slug];
      return acc;
    }, []);
    if (installedPackages.length > 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'packages already installed',
        message: `These packages are already installed: ${installedPackages.join(', ')}`,
      });
    }

    const installationModules = (await Promise.all(
      slugs.map(async (slug) => {
        return (await import(`./seeds/${slug}`)).default;
      }),
    )) as InstallationModule[];

    //Merge all installation modules selected in one object
    const installationSteps: ModuleInstallationSteps = {
      fieldQuestions: [],
      requestTemplates: [],
      specialties: [],
    };

    for (const installationModule of installationModules) {
      installationSteps.specialties.push({
        id: installationModule.id,
        name: installationModule.specialty,
        description: installationModule.description,
        isGroup: installationModule.isGroup,
        isPublic: installationModule.isPublic,
        requestTemplate: { id: installationModule.requestTemplate.id },
      });

      installationSteps.requestTemplates.push({
        id: installationModule.requestTemplate.id,
        name: `${systemPrefix}${installationModule.requestTemplate.name}`,
        fields: installationModule.requestTemplate.fields.map((field) => {
          const id = fieldQuestionsModule.fieldQuestions.find(
            (currentField) => currentField.slug === field.fieldQuestion.slug,
          )?.id;
          if (!id) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: 'field_question_not_found',
              message: `Module data mismatch. field question not found: ${field.fieldQuestion.slug}`,
            });
          }
          return {
            order: field.order,
            fieldQuestion: {
              id,
              slug: `${systemPrefix}${field.fieldQuestion.slug}`,
            },
          };
        }),
      });

      const prefixedFieldQuestions = fieldQuestionsModule.fieldQuestions.map(
        (field) => ({
          ...field,
          name: `${systemPrefix}${field.name}`,
          slug: `${systemPrefix}${field.slug}`,
        }),
      );
      installationSteps.fieldQuestions.push(...prefixedFieldQuestions);
    }

    //Verify that the selected module's specialties are not already installed
    const specialtyNames = installationSteps.specialties.map(
      (specialty) => specialty.name,
    );
    const duplicatedSpecialties =
      await this.specialtiesService.findAllWithNames(specialtyNames, {
        minimal: true,
      });
    if (duplicatedSpecialties.length > 0) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'specialties_already_installed',
        message: `These specialties are already installed: ${duplicatedSpecialties
          .map((specialty) => specialty.name)
          .join(', ')}`,
      });
    }

    //Remove duplicated resources (field questions)
    const fieldQuestionsMap: Record<string, FieldQuestionType> = {};
    for (const fieldQuestion of installationSteps.fieldQuestions) {
      if (!fieldQuestionsMap[fieldQuestion.slug]) {
        fieldQuestionsMap[fieldQuestion.slug] = fieldQuestion;
      }
    }
    installationSteps.fieldQuestions = Object.values(fieldQuestionsMap);

    //Create questions
    await this.fieldQuestionsService.createMultiple({
      fields: installationSteps.fieldQuestions,
    });

    //Create RequestTemplate
    await this.requestTemplatesService.createMultiple({
      templates: installationSteps.requestTemplates,
    });

    //Create Specialties
    await this.specialtiesService.createMultiple({
      specialties: installationSteps.specialties,
    });

    //Update the package status
    for (const packageMetadata of packagesMetadata) {
      await this.packageRepository.update(packageMetadata.id, {
        applied: true,
      });
    }
    return true;
  }
}
