import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: 'cf25845f-0aab-4b2b-ae0a-30f12ce7854b',
  specialty: 'Emergencia',
  description: 'Departamento para brindar atención inmediata',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '54d2c250-04d3-4861-b3e0-f359a92a140f',
    name: 'Emergencia',
    fields: [
      {
        fieldQuestion: { slug: 'posibles-causas' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'descripcion-del-suceso' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 3,
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
