type RequestTemplateType = {
  id: string;
  name: string;
  slug: string;
  fields: {
    fieldQuestion: {
      id: string;
    };
    order: number;
  }[];
};

const requestTemplates: RequestTemplateType[] = [
  {
    id: 'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b',
    name: 'Template 1',
    slug: 'template-1',
    fields: [
      {
        fieldQuestion: { id: '550e8400-e29b-41d4-a716-446655440000' },
        order: 1,
      },
      {
        fieldQuestion: { id: '550e8400-e29b-41d4-a716-446655440001' },
        order: 2,
      },
      {
        fieldQuestion: { id: '550e8400-e29b-41d4-a716-446655440002' },
        order: 3,
      },
      {
        fieldQuestion: { id: '550e8400-e29b-41d4-a716-446655440003' },
        order: 4,
      },
    ],
  },
];

export default requestTemplates;
