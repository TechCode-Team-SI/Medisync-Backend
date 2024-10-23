import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: 'f7896370-d5ff-46fb-a43a-3491b8cb1637',
  image: 'medicina-general',
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
  illnesses: [
    {
      id: 'ff05bba2-a208-4593-8ba0-f4c123dd1e77',
      name: 'Gripe',
      description:
        'Enfermedad viral aguda que afecta principalmente al sistema respiratorio.',
    },
    {
      id: '1fa22fda-a517-4062-8f90-719fc505bf97',
      name: 'Diabetes',
      description:
        'Enfermedad crónica que se caracteriza por niveles altos de azúcar en la sangre.',
    },
    {
      id: '6fd96b36-b3ea-4301-a088-026f1b9813b7',
      name: 'Hipertensión',
      description:
        'Enfermedad crónica caracterizada por una presión arterial elevada.',
    },
    {
      id: 'eed3ae1e-ba09-4ac5-b292-9d9d902edfb5',
      name: 'Asma',
      description:
        'Enfermedad crónica que provoca inflamación de las vías respiratorias.',
    },
    {
      id: 'e2317b68-75df-4b6d-b5ea-8259b281b86b',
      name: 'Artritis',
      description: 'Inflamación de una o más articulaciones.',
    },
    {
      id: 'fa462680-091a-4bad-9449-269ed1902aa8',
      name: 'Migraña',
      description:
        'Trastorno neurológico caracterizado por dolores de cabeza intensos y recurrentes.',
    },
    {
      id: '6162ea43-a122-4b4d-8752-b600761f2a44',
      name: 'Depresión',
      description:
        'Trastorno del estado de ánimo que causa sentimientos de tristeza, pérdida de interés y baja energía.',
    },
    {
      id: '78017ab3-f5e1-41e1-8d21-2516a6fe3ed9',
      name: 'Ansiedad',
      description:
        'Trastorno mental caracterizado por sentimientos de preocupación excesiva e incontrolable.',
    },
    {
      id: '1e7a4313-43d4-4410-a4e5-8f8d3d9548d1',
      name: 'Insomnio',
      description: 'Dificultad para conciliar el sueño o mantenerlo.',
    },
    {
      id: 'dc160717-7e5e-4172-b231-3d6879c7a4e1',
      name: 'Enfermedad de Alzheimer',
      description:
        'Enfermedad neurodegenerativa que afecta la memoria y otras funciones cognitivas.',
    },
  ],
  injuries: [
    {
      id: 'da562640-60d5-4876-8d52-66f99bcc2b85',
      name: 'Esguince de tobillo',
      description: 'Lesión de los ligamentos del tobillo.',
    },
    {
      id: '3523e1ab-c72d-4aec-9245-f1fb58795403',
      name: 'Fractura de muñeca',
      description: 'Rotura de uno o más huesos de la muñeca.',
    },
    {
      id: '7daf5338-7320-4609-be80-42f1e5592901',
      name: 'Luxación de hombro',
      description:
        'Desplazamiento de la cabeza del húmero de la cavidad glenoidea.',
    },
    {
      id: '4e41d114-683b-48b3-8143-78a68994c825',
      name: 'Conmoción cerebral',
      description: 'Lesión cerebral traumática leve.',
    },
    {
      id: 'cd920b5b-e4c0-44aa-8147-5ddc6c2d7339',
      name: 'Quemadura',
      description:
        'Lesión de la piel causada por el calor, el frío, sustancias químicas o radiación.',
    },
    {
      id: 'e662f807-ccc4-4422-906d-52acb18ab61e',
      name: 'Corte',
      description: 'Herida producida por un objeto cortante.',
    },
    {
      id: '4e46bd5f-679f-443c-89df-9078f37b7e7e',
      name: 'Esguince de rodilla',
      description: 'Lesión de los ligamentos de la rodilla.',
    },
  ],
  treatments: [
    {
      id: '6eb2adb5-f591-4bf4-9e55-2fb070b0ee58',
      name: 'Antibióticos',
      description:
        'Medicamentos utilizados para tratar infecciones bacterianas.',
    },
    {
      id: '7f85f662-c9cb-4e92-bc47-e3b61109a5fe',
      name: 'Fisioterapia',
      description:
        'Tratamiento que utiliza ejercicios y técnicas manuales para restaurar la función y movilidad.',
    },
    {
      id: '7fdaa154-5653-4753-9926-ea80a5bdd8fc',
      name: 'Medicamentos para el dolor',
      description: 'Fármacos utilizados para aliviar el dolor.',
    },
    {
      id: 'e377c857-ad12-4583-b967-a2f2cab5f507',
      name: 'Cirugía',
      description:
        'Procedimiento médico que implica la incisión del cuerpo para tratar una enfermedad o lesión.',
    },
    {
      id: '6f1e5c6f-b4b0-4df5-bf35-d77681bf421f',
      name: 'Radioterapia',
      description:
        'Tratamiento que utiliza radiación para destruir células cancerosas.',
    },
    {
      id: 'a865c725-26bc-455d-9bf5-cca12ec6cad9',
      name: 'Quimioterapia',
      description:
        'Tratamiento que utiliza medicamentos para destruir células cancerosas.',
    },
  ],
  pathologies: [
    {
      id: 'c218b54d-72a5-45f7-8175-df9b0024ddaf',
      name: 'Arteriosclerosis',
      description: 'Endurecimiento y engrosamiento de las arterias.',
    },
    {
      id: '23d0bf05-7bdf-417b-a7da-0505434ef7fc',
      name: 'Insuficiencia cardíaca',
      description:
        'Incapacidad del corazón para bombear suficiente sangre al cuerpo.',
    },
    {
      id: '08e246d3-1fc8-4233-8c89-75410cb49e61',
      name: 'Cáncer',
      description:
        'Enfermedad caracterizada por un crecimiento anormal de las células.',
    },
    {
      id: '2e580449-620c-4910-a6ec-e8e259f0235b',
      name: 'Enfermedad renal crónica',
      description: 'Pérdida progresiva de la función renal.',
    },
    {
      id: '68c9770b-b037-4a31-8392-cdd97f4d0985',
      name: 'Enfermedad pulmonar obstructiva crónica (EPOC)',
      description:
        'Enfermedad pulmonar inflamatoria que causa dificultad para respirar.',
    },
  ],
  symptoms: [
    {
      id: 'c62ad6f0-ce43-46e2-b9fa-cffbf43cc5a0',
      name: 'Fiebre',
      description:
        'Aumento de la temperatura corporal por encima de lo normal.',
    },
    {
      id: '4094c958-3c4a-470e-b09d-a34145821306',
      name: 'Dolor de cabeza',
      description: 'Sensación de dolor o molestia en la cabeza.',
    },
    {
      id: '1bea4c22-847a-427f-ac39-3abb14211d2a',
      name: 'Tos',
      description: 'Expulsión violenta del aire de los pulmones.',
    },
    {
      id: '',
      name: 'Dificultad para respirar',
      description: 'Sensación de falta de aire.',
    },
    {
      id: 'c33e2e90-f480-4e5f-aad0-58f4fd9caed9',
      name: 'Nauseas',
      description: 'Sensación de malestar en el estómago con ganas de vomitar.',
    },
    {
      id: 'c6f26cce-640e-4c1c-b930-4820a798aa02',
      name: 'Vómitos',
      description: 'Expulsión violenta del contenido del estómago por la boca.',
    },
    {
      id: 'bec7fe62-c3d6-4991-a2b8-7cdd2819cdaf',
      name: 'Diarrea',
      description: 'Evacuaciones intestinales frecuentes y acuosas.',
    },
  ],
};

export default installationModule;
