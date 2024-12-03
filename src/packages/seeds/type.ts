import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
import { FileDto } from 'src/files/dto/file.dto';
import { RecursiveRequired } from 'src/utils/types/deep-required.type';

export type GlossaryData = {
  id: string;
  name: string;
  description: string;
};

type RequestTemplate = {
  id: string;
  name: string;
  fields: {
    order: number;
    fieldQuestion: {
      id?: string;
      slug: string;
    };
  }[];
};

export type InstallationModule = {
  id: string;
  isGroup: boolean;
  isPublic: boolean;
  specialty: string;
  description: string;
  requestTemplate: RequestTemplate;
  injuries: GlossaryData[];
  treatments: GlossaryData[];
  pathologies: GlossaryData[];
  symptoms: GlossaryData[];
  image?: string;
};

export type ModuleInstallationSteps = {
  fieldQuestions: FieldQuestionType[];
  injuries: RecursiveRequired<InstallationModule['injuries']>;
  pathologies: RecursiveRequired<InstallationModule['pathologies']>;
  treatments: RecursiveRequired<InstallationModule['treatments']>;
  symptoms: RecursiveRequired<InstallationModule['symptoms']>;
  requestTemplates: RecursiveRequired<InstallationModule['requestTemplate']>[];
  specialties: {
    id: InstallationModule['id'];
    name: InstallationModule['specialty'];
    description: InstallationModule['description'];
    isGroup: InstallationModule['isGroup'];
    isPublic: InstallationModule['isPublic'];
    requestTemplate: {
      id: string;
    };
    image?: FileDto | null;
  }[];
};
