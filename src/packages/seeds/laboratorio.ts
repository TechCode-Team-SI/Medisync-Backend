import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '46264213-0dbe-4a2c-8e8e-763fcf123cc0',
  specialty: 'Laboratorio',
  description: 'Departamento especializado en analizar muestras biológicas',
  isGroup: true,
  isPublic: true,
  requestTemplate: {
    id: '0e107156-5a3c-4dbe-8255-576f6eec8563',
    name: 'Laboratorio',
    fields: [
      {
        fieldQuestion: { slug: 'examenes' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'examenes-adicionales' },
        order: 2,
      },
    ],
  },
};

export default installationModule;
