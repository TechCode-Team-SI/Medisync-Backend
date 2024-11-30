import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '278c4c42-7269-4a1d-95da-854ad6a876d7',
  image: 'anestesiologia',
  specialty: 'Anestesia',
  description:
    'Departamento hecho para garantizar la seguridad y el bienestar del paciente durante procedimientos quirúrgicos y algunos exámenes médicos',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '84bf5053-751d-4553-90ef-fa57034526e4',
    name: 'Anestesia',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-consulta' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'valoracion-medica' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 3,
      },
    ],
  },
  injuries: [],
  treatments: [],
  pathologies: [],
  symptoms: [],
};

export default installationModule;
