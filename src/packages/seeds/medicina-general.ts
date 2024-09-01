import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '9fe690fb-fb50-43a3-8196-3efaa0470155',
  specialty: 'Medicina general',
  description: 'Nivel de atención médica que realiza procedimientos sencillos',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '34f8e070-e4d4-4352-96f4-b3fe51d69dfb',
    name: 'Medicina general',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-visita' },
        order: 1,
      },
    ],
  },
};

export default installationModule;
