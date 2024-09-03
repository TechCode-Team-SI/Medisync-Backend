import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '64d2d79b-fbc7-4c69-ac5b-69656c5048a8',
  specialty: 'Hemoterapia',
  description:
    'Departamento encargado de la extracción, procesamiento, almacenamiento y transfusión de sangre y sus componentes',
  isGroup: true,
  isPublic: false,
  requestTemplate: {
    id: '78f95eb1-a79f-4d38-980a-eb8a478495c1',
    name: 'Hemoterapia',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-visita' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'hemoterapia-servicio' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'servicios-adicionales' },
        order: 3,
      },
    ],
  },
};

export default installationModule;
