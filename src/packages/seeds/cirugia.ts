import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '9fe690fb-fb50-43a3-8196-3efaa0470154',
  specialty: 'Cirugía',
  description:
    'Departamento donde se realizan intervenciones quirúrgicas variadas',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '34f8e070-e4d4-4352-96f4-b3fe51d69dfc',
    name: 'Cirugía',
    fields: [
      {
        fieldQuestion: { slug: 'tipo-de-cirugia' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'valoracion-medica' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'valoracion-preoperatoria' },
        order: 3,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 4,
      },
    ],
  },
};

export default installationModule;
