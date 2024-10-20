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
  illnesses: [],
  injuries: [],
  treatments: [],
  pathologies: [],
  symptoms: [],
};

export default installationModule;
