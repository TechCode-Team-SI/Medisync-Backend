import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: 'f7896370-d5ff-46fb-a43a-3491b8cb1637',
  specialty: 'Medicina general',
  description: 'Nivel de atención médica que realiza procedimientos sencillos',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '470561f6-9d8f-40c6-a03d-647cf1eab1dd',
    name: 'Medicina general',
    fields: [
      {
        fieldQuestion: { slug: 'sintomas-comunes' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 2,
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
