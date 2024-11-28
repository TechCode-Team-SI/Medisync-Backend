import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
import { ChartType } from './statistics-metadata.enum';

export type Chart = {
  type: ChartType;
  title: string;
  description: string;
  data: {
    category: string;
    value: number;
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
