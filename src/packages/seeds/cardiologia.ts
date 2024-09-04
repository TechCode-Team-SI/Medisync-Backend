import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '67b2f157-49b1-470e-93eb-3cfed3145fd0',
  specialty: 'Cardiología',
  description: 'Departamento encargado de la salud del corazón',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '34f8e070-e4d4-4352-96f4-b3fe51d69dfa',
    name: 'Cardiología',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-consulta' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'sintomas-actuales' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'diagnostico-condiciones' },
        order: 3,
      },
      {
        fieldQuestion: { slug: 'cirugia-procedimiento-cardiaco' },
        order: 4,
      },
      {
        fieldQuestion: { slug: 'medicamento-corazon' },
        order: 5,
      },
      {
        fieldQuestion: { slug: 'antecedentes-cardiacas-familiares' },
        order: 6,
      },
      {
        fieldQuestion: { slug: 'fuma' },
        order: 7,
      },
      {
        fieldQuestion: { slug: 'consume-alcohol' },
        order: 8,
      },
      {
        fieldQuestion: { slug: 'realiza-actividad-física-regularmente' },
        order: 9,
      },
      {
        fieldQuestion: { slug: 'medicamentos-actuales' },
        order: 10,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 11,
      },
    ],
  },
};

export default installationModule;
