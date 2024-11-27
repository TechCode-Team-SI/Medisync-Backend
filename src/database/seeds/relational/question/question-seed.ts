import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';

export type FieldQuestionType = {
  id: string;
  name: string;
  slug: string;
  label: string;
  description?: string;
  type: FieldQuestionTypeEnum;
  isRequired: boolean;
  selectionConfig?: {
    isMultiple: boolean;
  };
  selections?: {
    id?: string;
    value: string;
  }[];
};

export type TextQuestionType = Pick<
  FieldQuestionType,
  'name' | 'label' | 'slug' | 'type' | 'description' | 'isRequired' | 'id'
>;

export type SelectionQuestionType = Pick<
  FieldQuestionType,
  | 'name'
  | 'label'
  | 'slug'
  | 'description'
  | 'label'
  | 'type'
  | 'isRequired'
  | 'id'
> &
  Pick<Required<FieldQuestionType>, 'selections' | 'selectionConfig'>;

export function isTextQuestionType(
  fieldQuestion: FieldQuestionType,
): fieldQuestion is TextQuestionType {
  const types = [FieldQuestionTypeEnum.TEXT, FieldQuestionTypeEnum.NUMBER];
  return types.includes(fieldQuestion.type);
}

export function isSelectionQuestionType(
  fieldQuestion: FieldQuestionType,
): fieldQuestion is SelectionQuestionType {
  return fieldQuestion.type === FieldQuestionTypeEnum.SELECTION;
}

const fieldQuestions: FieldQuestionType[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    isRequired: true,
    name: 'visit reason',
    slug: 'visit-reason',
    label: "Reason for today's visit",
    type: FieldQuestionTypeEnum.TEXT,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    isRequired: false,
    name: 'symptoms',
    slug: 'symptoms',
    label: 'Do you have any specific concerns or symptoms',
    type: FieldQuestionTypeEnum.TEXT,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    isRequired: true,
    name: 'smoking',
    slug: 'smoking',
    label: 'Do you smoke?',
    type: FieldQuestionTypeEnum.SELECTION,
    selectionConfig: {
      isMultiple: false,
    },
    selections: [
      { id: 'b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', value: 'yes' },
      { id: 'a3b4c5d6-e7f8-9a0b-1c2d-3e4f5a6b7c8d', value: 'no' },
    ],
  },
];

export default fieldQuestions;
