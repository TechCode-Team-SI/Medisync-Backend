import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: 'b59e6c5b-b844-4f73-bcc4-0f1d45c3a5b4',
  image: 'ginecologia',
  specialty: 'Gineco-obstetricia',
  description: 'Especialidad encargada de la salud de la mujer',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '03d0a657-fc5a-4b91-8aee-94848a55f394',
    name: 'Gineco-obstetricia',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-consulta' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'sintomas-gineco-obstetricia' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'embarazada' },
        order: 3,
      },
      {
        fieldQuestion: { slug: 'menopausia' },
        order: 4,
      },
      {
        fieldQuestion: { slug: 'fuma' },
        order: 5,
      },
      {
        fieldQuestion: { slug: 'consume-alcohol' },
        order: 6,
      },
      {
        fieldQuestion: { slug: 'realiza-actividad-física-regularmente' },
        order: 7,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 8,
      },
    ],
  },
  injuries: [],
  treatments: [
    {
      id: 'b770d2e9-a1f4-4ace-a200-d10194c356aa',
      name: 'Antibióticos',
      description: 'Medicamentos para tratar infecciones bacterianas.',
    },
    {
      id: '7f9464ce-5f27-4e55-a05e-f6779d74cf9c',
      name: 'Antifúngicos',
      description: 'Medicamentos para tratar infecciones por hongos.',
    },
    {
      id: 'b5b4bf54-dbf9-4acb-a552-6274b55123be',
      name: 'Anticonceptivos hormonales',
      description: 'Métodos anticonceptivos que contienen hormonas.',
    },
    {
      id: '5b166adc-3678-4a26-ba53-b705e5d29725',
      name: 'Cirugía',
      description:
        'Procedimiento quirúrgico para tratar diversas condiciones ginecológicas.',
    },
    {
      id: '205b2f68-6464-4ae8-b130-325253caf314',
      name: 'Fertilización in vitro (FIV)',
      description: 'Técnica de reproducción asistida.',
    },
    {
      id: '77c10193-e14f-4d05-be39-8ef54e233e3d',
      name: 'Seguimiento prenatal',
      description: 'Cuidados médicos durante el embarazo.',
    },
  ],
  pathologies: [],
  symptoms: [
    {
      id: '5c5e7a0d-e3db-4eee-bd72-05f27ec0fbeb',
      name: 'Dolor pélvico',
      description: 'Dolor en la zona baja del abdomen.',
    },
    {
      id: 'a3b096eb-7994-4035-96c4-4daf31ebed65',
      name: 'Sangrado vaginal anormal',
      description: 'Sangrado fuera del período menstrual normal.',
    },
    {
      id: '8dec45d3-37df-4866-81a4-90a077a8bae1',
      name: 'Flujo vaginal anormal',
      description:
        'Cambios en el flujo vaginal en cuanto a cantidad, color u olor.',
    },
    {
      id: '24fbfe5d-6cf0-4fce-b6a8-09928f3d1aef',
      name: 'Dolor durante las relaciones sexuales',
      description: 'Dispareunia.',
    },
    {
      id: '9055705f-fdaf-4584-9a86-3c618f599f3b',
      name: 'Micción frecuente o dolorosa',
      description: 'Necesidad de orinar con frecuencia o dolor al orinar.',
    },
  ],
};

export default installationModule;
