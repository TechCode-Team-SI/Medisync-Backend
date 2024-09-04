import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '995a6ad3-07b9-4500-b21f-e6c9d549d617',
  specialty: 'Farmacia',
  description:
    'Departamento donde se preparan, dispensan y controlan los medicamentos',
  isGroup: true,
  isPublic: true,
  requestTemplate: {
    id: '6ae75f36-1cea-4b7c-9c9f-83cdd4be1fc7',
    name: 'Farmacia',
    fields: [
      {
        fieldQuestion: { slug: 'farmacos' },
        order: 1,
      },
    ],
  },
};

export default installationModule;
