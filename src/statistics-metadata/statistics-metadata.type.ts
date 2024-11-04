import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';

export type Tart = {
  label: string;
  description: string;
  data: {
    label: string;
    probabilities: number;
  }[];
};

export type Histogram = {
  label: string;
  description: string;
  data: {
    label: string;
    frequency: number;
  }[];
};

export type AvailableSpecialty = {
  id: string;
  name: string;
};

export type AvailableFieldQuestion = {
  id: string;
  name: string;
  type: FieldQuestionType;
};
