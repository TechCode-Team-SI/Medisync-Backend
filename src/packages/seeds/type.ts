import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
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
  illnesses: GlossaryData[];
  injuries: GlossaryData[];
  treatments: GlossaryData[];
  pathologies: GlossaryData[];
  symptoms: GlossaryData[];
};

export type ModuleInstallationSteps = {
  fieldQuestions: FieldQuestionType[];
  illnesses: RecursiveRequired<InstallationModule['illnesses']>;
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
  }[];
};
