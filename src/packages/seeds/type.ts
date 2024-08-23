import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
import { RecursiveRequired } from 'src/utils/types/deep-required.type';

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
};

export type ModuleInstallationSteps = {
  fieldQuestions: FieldQuestionType[];
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
  }[];
};
