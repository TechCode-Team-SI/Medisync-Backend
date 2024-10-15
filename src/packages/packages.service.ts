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
import { FilterPackageDto, SortPackageDto } from './dto/find-all-packages.dto';
import { PathologiesService } from 'src/pathologies/pathologies.service';
import { SymptomsService } from 'src/symptoms/symptoms.service';
import { IllnessesService } from 'src/illnesses/illnesses.service';
import { TreatmentsService } from 'src/treatments/treatments.service';
import { InjuriesService } from 'src/injuries/injuries.service';

@Injectable()
export class PackagesService {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly specialtiesService: SpecialtiesService,
    private readonly fieldQuestionsService: FieldQuestionsService,
    private readonly requestTemplatesService: RequestTemplatesService,
    private readonly pathologiesService: PathologiesService,
    private readonly symptomsService: SymptomsService,
    private readonly illnessesService: IllnessesService,
    private readonly treatmentsService: TreatmentsService,
    private readonly injuriesService: InjuriesService,
  ) {}

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortPackageDto[] | null;
    filterOptions?: FilterPackageDto | null;
  }) {
    return this.packageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
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
      illnesses: [],
      injuries: [],
      pathologies: [],
      treatments: [],
      symptoms: [],
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

      installationSteps.illnesses.push(...installationModule.illnesses);
      installationSteps.injuries.push(...installationModule.injuries);
      installationSteps.pathologies.push(...installationModule.pathologies);
      installationSteps.treatments.push(...installationModule.treatments);
      installationSteps.symptoms.push(...installationModule.symptoms);

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

    //Remove pathologies that are already installed
    const pathologyNames = installationSteps.pathologies.map(
      (pathology) => pathology.name,
    );
    const duplicatedPathologies =
      await this.pathologiesService.findAllWithNames(pathologyNames, {
        minimal: true,
      });
    if (duplicatedPathologies.length > 0) {
      installationSteps.pathologies = installationSteps.pathologies.filter(
        (pathology) =>
          !duplicatedPathologies.find(
            (duplicatedPathology) =>
              duplicatedPathology.name === pathology.name,
          ),
      );
    }

    //Remove symptoms that are already installed
    const symptomNames = installationSteps.symptoms.map(
      (symptom) => symptom.name,
    );
    const duplicatedSymptoms = await this.symptomsService.findAllWithNames(
      symptomNames,
      {
        minimal: true,
      },
    );
    if (duplicatedSymptoms.length > 0) {
      installationSteps.symptoms = installationSteps.symptoms.filter(
        (symptom) =>
          !duplicatedSymptoms.find(
            (duplicatedSymptom) => duplicatedSymptom.name === symptom.name,
          ),
      );
    }

    //Remove illnesses that are already installed
    const illnessesName = installationSteps.illnesses.map(
      (illness) => illness.name,
    );
    const duplicatedIllnesses = await this.illnessesService.findAllWithNames(
      illnessesName,
      {
        minimal: true,
      },
    );
    if (duplicatedIllnesses.length > 0) {
      installationSteps.illnesses = installationSteps.illnesses.filter(
        (illness) =>
          !duplicatedIllnesses.find(
            (duplicatedSymptom) => duplicatedSymptom.name === illness.name,
          ),
      );
    }

    //Remove injuries that are already installed
    const injuriesName = installationSteps.injuries.map(
      (injury) => injury.name,
    );
    const duplicatedInjuries = await this.injuriesService.findAllWithNames(
      injuriesName,
      {
        minimal: true,
      },
    );
    if (duplicatedInjuries.length > 0) {
      installationSteps.injuries = installationSteps.injuries.filter(
        (injury) =>
          !duplicatedInjuries.find(
            (duplicatedSymptom) => duplicatedSymptom.name === injury.name,
          ),
      );
    }

    //Remove treatments that are already installed
    const treatmentsName = installationSteps.treatments.map(
      (treatment) => treatment.name,
    );
    const duplicatedTreatments = await this.treatmentsService.findAllWithNames(
      treatmentsName,
      {
        minimal: true,
      },
    );
    if (duplicatedTreatments.length > 0) {
      installationSteps.treatments = installationSteps.treatments.filter(
        (treatment) =>
          !duplicatedTreatments.find(
            (duplicatedTreatment) =>
              duplicatedTreatment.name === treatment.name,
          ),
      );
    }

    //Remove duplicated resources (field questions)
    const fieldQuestionsMap: Record<string, FieldQuestionType> = {};
    for (const fieldQuestion of installationSteps.fieldQuestions) {
      if (!fieldQuestionsMap[fieldQuestion.slug]) {
        fieldQuestionsMap[fieldQuestion.slug] = fieldQuestion;
      }
    }
    const fieldQuestions = Object.values(fieldQuestionsMap);
    //Remove already installed field questions
    const fieldSlugs = fieldQuestions.map((field) => field.slug);
    const installedFieldQuestions =
      await this.fieldQuestionsService.findAllBySlugs(fieldSlugs, {
        minimal: true,
      });
    const installedFieldSlugs = installedFieldQuestions.map(
      (field) => field.slug,
    );
    installationSteps.fieldQuestions = fieldQuestions.filter(
      (field) => !installedFieldSlugs.includes(field.slug),
    );
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

    //Create Pathologies
    await this.pathologiesService.createMultiple({
      pathologies: installationSteps.pathologies,
    });

    //Create Symptoms
    await this.symptomsService.createMultiple({
      symptoms: installationSteps.symptoms,
    });

    //Create Illnesses
    await this.illnessesService.createMultiple({
      illnesses: installationSteps.illnesses,
    });

    //Create Treatments
    await this.treatmentsService.createMultiple({
      treatments: installationSteps.treatments,
    });

    //Create Injuries
    await this.injuriesService.createMultiple({
      injuries: installationSteps.injuries,
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
