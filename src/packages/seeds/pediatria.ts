import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '7ee81567-88e7-4546-bed3-869c95289dd3',
  specialty: 'Pediatría',
  description: 'Especialidad encargada de la salud de los niños',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '4197203a-e7fc-4823-9baf-c3f328754b13',
    name: 'Pediatría',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-consulta' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'sintomas-comunes' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'alimentacion' },
        order: 3,
      },
      {
        fieldQuestion: { slug: 'sueño' },
        order: 4,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 5,
      },
    ],
  },
};

export default installationModule;
