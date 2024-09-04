import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: 'e4a6de6e-209b-4528-b553-ebdfc865f37b',
  specialty: 'Radiología',
  description:
    'Departamento especializado en obtener imágenes del interior del cuerpo, con el objetivo de diagnosticar enfermedades, evaluar tratamientos y realizar procedimientos médicos',
  isGroup: true,
  isPublic: true,
  requestTemplate: {
    id: '81558841-addd-4941-87d1-11479021cd86',
    name: 'Radiología',
    fields: [
      {
        fieldQuestion: { slug: 'examenes-radiologicos' },
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
