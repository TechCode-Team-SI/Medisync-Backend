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
  illnesses: [
    {
      id: '558356d5-ff99-4cac-851f-8c97855871d2',
      name: 'Infecciones del tracto urinario (ITU)',
      description: 'Infección bacteriana que afecta el tracto urinario.',
    },
    {
      id: 'c5024938-06b8-48d2-ab8e-f25a52174fcd',
      name: 'Vaginosis bacteriana',
      description: 'Desequilibrio de las bacterias vaginales.',
    },
    {
      id: 'f90b6aae-74a8-4266-a0fe-82b09a45e93e',
      name: 'Candidiasis',
      description: 'Infección vaginal por hongos.',
    },
    {
      id: 'aa900d05-3cfb-4cad-87a9-3bddc5b70ded',
      name: 'Enfermedad inflamatoria pélvica (EIP)',
      description: 'Infección de los órganos reproductores femeninos.',
    },
    {
      id: '70cffe18-54a3-4423-abc3-37e358e35c83',
      name: 'Endometriosis',
      description: 'Crecimiento del tejido endometrial fuera del útero.',
    },
    {
      id: '61ee8ed5-3893-47ba-b314-09921576b819',
      name: 'Miomas uterinos',
      description: 'Tumores benignos en el útero.',
    },
    {
      id: 'ba2b64ea-e12e-4266-9eab-5ed6a1cd1faf',
      name: 'Quistes ováricos',
      description: 'Sacos llenos de líquido en los ovarios.',
    },
    {
      id: 'bc21ed45-da32-47cb-8a97-380a9cae2199',
      name: 'Síndrome de ovario poliquístico (SOP)',
      description:
        'Desequilibrio hormonal que afecta los ovarios y el metabolismo.',
    },
    {
      id: 'd0b589bf-a367-4f64-82c6-c43bcd5007c8',
      name: 'Cáncer de cuello uterino',
      description: 'Crecimiento anormal de células en el cuello uterino.',
    },
    {
      id: '52c4f45a-f61f-40ce-8073-4986a5e0934b',
      name: 'Cáncer de mama',
      description: 'Crecimiento anormal de células en el tejido mamario.',
    },
  ],
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
