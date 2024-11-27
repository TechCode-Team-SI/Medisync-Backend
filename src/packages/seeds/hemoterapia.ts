import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '64d2d79b-fbc7-4c69-ac5b-69656c5048a8',
  image: 'hemoterapia',
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
        fieldQuestion: { slug: 'hemoterapia-servicio' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'servicios-adicionales' },
        order: 2,
      },
    ],
  },
  injuries: [
    {
      id: 'abd84d59-96b2-4f47-b8d0-b12245197806',
      name: 'Hemorragia interna',
      description: 'Pérdida de sangre dentro del cuerpo',
    },
    {
      id: '0de6ccfa-8e4e-4f75-a7ab-477c65e724ed',
      name: 'Traumatismo craneoencefálico',
      description:
        'Lesión en el cráneo y el cerebro que puede causar hemorragia',
    },
    {
      id: '6925588e-a8d3-4531-b9a7-ac7e1a94740f',
      name: 'Quemaduras graves',
      description:
        'Lesiones causadas por el calor, el frío o sustancias químicas que pueden provocar pérdida de sangre',
    },
  ],

  treatments: [
    {
      id: 'decad8c4-be5b-48a7-a169-6b54bba5a6d0',
      name: 'Transfusión de sangre',
      description: 'Administración de sangre o componentes sanguíneos',
    },
    {
      id: '3b2b4c0a-531d-4b38-a423-bcdff3f2b33b',
      name: 'Quimioterapia',
      description: 'Tratamiento del cáncer con medicamentos',
    },
    {
      id: 'a2aa9f35-7c49-4110-8a99-fb899f589b5e',
      name: 'Radioterapia',
      description: 'Tratamiento del cáncer con radiación',
    },
    {
      id: 'd7f2dc98-e5b2-46e8-892b-94c8779b912d',
      name: 'Esplenectomía',
      description: 'Extirpación del bazo',
    },
    {
      id: '15ecf653-8cdd-4d99-a47f-3f3f6d8b96f6',
      name: 'Transplante de médula ósea',
      description: 'Reemplazo de la médula ósea enferma por una sana',
    },
  ],

  pathologies: [
    {
      id: 'ab122dff-9404-4ff8-aead-77b4b0b920ac',
      name: 'Leucemia',
      description: 'Cáncer de la médula ósea',
    },
    {
      id: '74ec0a7d-97a8-48e1-8337-680e068f8439',
      name: 'Linfoma',
      description: 'Cáncer del sistema linfático',
    },
    {
      id: 'd1b12b4e-5712-442c-a069-f46bbd858f7d',
      name: 'Mieloma múltiple',
      description: 'Cáncer de las células plasmáticas',
    },
    {
      id: 'e53bb330-4cc9-41fe-b612-39ecceac227c',
      name: 'Policitemia vera',
      description:
        'Trastorno mieloproliferativo caracterizado por un aumento excesivo de glóbulos rojos',
    },
  ],

  symptoms: [
    {
      id: '97c2e0f7-ab65-42d4-ab8a-1a701660c295',
      name: 'Fatiga',
      description: 'Sensación de cansancio extremo',
    },
    {
      id: '2c3b345f-9578-49ce-83d2-91d1ef152ce5',
      name: 'Palidez',
      description: 'Coloración pálida de la piel',
    },
    {
      id: 'cb73707e-0d62-4fd5-a03f-58e616856e33',
      name: 'Dificultad para respirar',
      description: 'Falta de aire',
    },
    {
      id: '283b8016-e9c9-435c-9ef4-5a5fcc5533d8',
      name: 'Moretones fáciles',
      description: 'Aparición de hematomas sin causa aparente',
    },
    {
      id: '2e56e019-1f05-4cc6-b9e2-020e09cd83c0',
      name: 'Sangrado excesivo',
      description: 'Sangrado que no se detiene fácilmente',
    },
  ],
};

export default installationModule;
