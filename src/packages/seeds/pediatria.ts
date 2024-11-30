import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '7ee81567-88e7-4546-bed3-869c95289dd3',
  image: 'pediatria',
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
  injuries: [
    {
      id: '9539be96-c218-480b-9861-48aa46d0cbef',
      name: 'Caídas',
      description:
        'Lesiones comunes en niños, pueden causar contusiones, fracturas o lesiones en la cabeza.',
    },
    {
      id: 'cd384949-5ee3-4f2a-a453-79e0c7be8d11',
      name: 'Fracturas',
      description: 'Rotura de un hueso.',
    },
    {
      id: '9975c7fa-fc27-4fe2-bfbc-9e50d4030246',
      name: 'Contusiones',
      description: 'Moretones o hematomas.',
    },
    {
      id: 'f7312f9e-06ca-4adb-a15c-6dd582fdfcef',
      name: 'Luxaciones',
      description: 'Desplazamiento de un hueso de su articulación.',
    },
    {
      id: 'd3ff1968-acc6-45a3-9ee6-fd780667f91d',
      name: 'Quemaduras',
      description:
        'Lesiones de la piel causadas por el calor, el frío, sustancias químicas o radiación.',
    },
    {
      id: 'a2c19428-c22b-4802-a411-6b6ecab60f38',
      name: 'Picaduras de insectos',
      description:
        'Reacciones alérgicas o infecciones causadas por picaduras de insectos.',
    },
    {
      id: 'd3914f3d-ed7c-4ffa-b428-e331786a60fc',
      name: 'Objetos extraños en la nariz o los oídos',
      description: 'Accidentes comunes en niños pequeños.',
    },
  ],
  treatments: [
    {
      id: 'b9d4cbe3-009b-4f72-87ea-d37f27df4c65',
      name: 'Medicamentos para el dolor y la fiebre',
      description: 'Acetaminofén o ibuprofeno.',
    },
    {
      id: '6073439e-4c07-4957-9b95-3aae70d12bb5',
      name: 'Antibióticos',
      description:
        'Medicamentos utilizados para tratar infecciones bacterianas.',
    },
    {
      id: '7a41b5fc-dd2c-4269-aae9-ba6f476a076e',
      name: 'Líquidos',
      description: 'Importantes para prevenir la deshidratación.',
    },
    {
      id: '1ac0c93d-de0a-41e4-b5ba-a02f273f3190',
      name: 'Descanso',
      description: 'Permite que el cuerpo se recupere.',
    },
    {
      id: '0d18f7f2-416e-429e-9485-941ced887250',
      name: 'Compresas frías o calientes',
      description: 'Para aliviar el dolor y la inflamación.',
    },
    {
      id: '87d0b87e-d4cd-4ecc-adf7-c4e51612a67f',
      name: 'Inhaladores',
      description: 'Para tratar el asma y otras enfermedades respiratorias.',
    },
    {
      id: 'afa78ace-341f-4d0c-833d-4cd2bd4eaa7f',
      name: 'Vacunas',
      description: 'Prevención de enfermedades infecciosas.',
    },
  ],
  pathologies: [
    {
      id: '5368b70b-6435-4dea-bf2f-a78f1690b3e3',
      name: 'Defectos congénitos',
      description: 'Anomalías presentes al nacer.',
    },
    {
      id: '64aa9ea5-757c-4013-96eb-5e0163fb9556',
      name: 'Trastornos del desarrollo',
      description:
        'Retraso o dificultad en el desarrollo físico, cognitivo, social o emocional.',
    },
    {
      id: 'eaf1226b-9cf4-4e0b-9250-bfce66c31033',
      name: 'Trastornos del comportamiento',
      description:
        'Dificultades para controlar el comportamiento o las emociones.',
    },
    {
      id: '8fb34ffa-bc88-4c61-a8d8-163b7056fbde',
      name: 'Trastornos del aprendizaje',
      description: 'Dificultades para aprender o procesar la información.',
    },
    {
      id: 'ec4dcb8a-6539-4671-85dc-543e2db90312',
      name: 'Trastornos del sueño',
      description: 'Problemas para dormir o mantenerse dormido.',
    },
  ],
  symptoms: [
    {
      id: 'd54de247-ed6f-4bfe-85e2-d29297a4b57f',
      name: 'Fiebre',
      description:
        'Aumento de la temperatura corporal por encima de lo normal.',
    },
    {
      id: '3cae0c57-4299-47a4-8529-cc180f01d9d1',
      name: 'Tos',
      description: 'Expulsión violenta del aire de los pulmones.',
    },
    {
      id: '74ecc429-9dfc-4142-ac17-7ee4e4032627',
      name: 'Dificultad para respirar',
      description: 'Sensación de falta de aire.',
    },
    {
      id: '073abb1f-4351-47cf-a3e4-cf080f6b1916',
      name: 'Dolor de cabeza',
      description: 'Sensación de dolor o molestia en la cabeza.',
    },
    {
      id: 'deff64eb-5825-43e6-95d5-995c8f3c4c35',
      name: 'Dolor de garganta',
      description: 'Dolor o irritación en la garganta.',
    },
    {
      id: '9bc8deda-002a-4784-b8d0-003156fc06a1',
      name: 'Dolor abdominal',
      description: 'Dolor en el estómago o el abdomen.',
    },
    {
      id: 'c1f63e6a-4415-4507-8b08-49cb505f5461',
      name: 'Vómitos',
      description: 'Expulsión violenta del contenido del estómago por la boca.',
    },
    {
      id: '3bb5bc69-7775-4f17-9340-4ad68c3632c0',
      name: 'Diarrea',
      description: 'Evacuaciones intestinales frecuentes y acuosas.',
    },
    {
      id: '8dc47515-4801-4432-8eff-af92838cc496',
      name: 'Rash',
      description: 'Erupción cutánea.',
    },
    {
      id: '6207b521-8400-439b-a20d-c9213063d4ab',
      name: 'Irritabilidad',
      description: 'Estado de mal humor o fácilmente irritado.',
    },
  ],
};

export default installationModule;
