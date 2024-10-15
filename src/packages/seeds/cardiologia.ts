import { InstallationModule } from './type';

const installationModule: InstallationModule = {
  id: '67b2f157-49b1-470e-93eb-3cfed3145fd0',
  specialty: 'Cardiología',
  description: 'Departamento encargado de la salud del corazón',
  isGroup: false,
  isPublic: true,
  requestTemplate: {
    id: '34f8e070-e4d4-4352-96f4-b3fe51d69dfa',
    name: 'Cardiología',
    fields: [
      {
        fieldQuestion: { slug: 'razon-de-la-consulta' },
        order: 1,
      },
      {
        fieldQuestion: { slug: 'sintomas-actuales' },
        order: 2,
      },
      {
        fieldQuestion: { slug: 'diagnostico-condiciones' },
        order: 3,
      },
      {
        fieldQuestion: { slug: 'cirugia-procedimiento-cardiaco' },
        order: 4,
      },
      {
        fieldQuestion: { slug: 'medicamento-corazon' },
        order: 5,
      },
      {
        fieldQuestion: { slug: 'antecedentes-cardiacas-familiares' },
        order: 6,
      },
      {
        fieldQuestion: { slug: 'fuma' },
        order: 7,
      },
      {
        fieldQuestion: { slug: 'consume-alcohol' },
        order: 8,
      },
      {
        fieldQuestion: { slug: 'realiza-actividad-física-regularmente' },
        order: 9,
      },
      {
        fieldQuestion: { slug: 'medicamentos-actuales' },
        order: 10,
      },
      {
        fieldQuestion: { slug: 'detalles-adicionales' },
        order: 11,
      },
    ],
  },
  illnesses: [
    {
      id: 'cab16812-259b-4b7c-bf31-ee587e6f93c2',
      name: 'Enfermedad de las arterias coronarias',
      description:
        'Una enfermedad causada por la acumulación de placa en las arterias coronarias, lo que lleva a una reducción del flujo sanguíneo al corazón.',
    },
    {
      id: '898bc231-fec7-4ef6-b40e-69d548a452d9',
      name: 'Enfermedad valvular cardíaca',
      description:
        'Una condición que implica daño a una o más de las válvulas del corazón, lo que puede interrumpir el flujo sanguíneo normal.',
    },
    {
      id: '3b7f11e0-a66e-4c48-a103-1b19f3b8b97b',
      name: 'Enfermedad cardíaca congénita',
      description:
        'Una variedad de defectos en la estructura del corazón presentes al nacer, que pueden afectar el flujo sanguíneo a través del corazón.',
    },
    {
      id: '39dbb5d2-9b22-4d9c-aad6-e879a2a78471',
      name: 'Enfermedad arterial periférica',
      description:
        'Una condición en la que las arterias estrechas reducen el flujo sanguíneo a las extremidades, a menudo causando dolor en las piernas y aumentando el riesgo cardiovascular.',
    },
    {
      id: '9fb9006c-f773-4aee-bf57-62a63de7d520',
      name: 'Miocardiopatía',
      description:
        'Una enfermedad del músculo cardíaco que dificulta que el corazón bombee sangre, lo que puede llevar a insuficiencia cardíaca.',
    },
  ],
  injuries: [
    {
      id: 'de7cfd53-9e2b-4b6c-a715-e8f3800f12bc',
      name: 'Contusión Cardíaca',
      description:
        'Un moretón en el músculo cardíaco, a menudo resultante de un trauma contundente en el pecho, que puede afectar la función del corazón.',
    },
    {
      id: 'aeed521b-c343-40b9-bce6-8f329c716034',
      name: 'Lesión Miocárdica',
      description:
        'Daño al músculo cardíaco debido a diversas causas, incluido el trauma, que puede llevar a una función cardíaca deteriorada.',
    },
    {
      id: '319fbbba-324a-4853-953f-6040e35c4b02',
      name: 'Lesión Aórtica',
      description:
        'Una condición grave resultante de un trauma en la aorta, que puede llevar a una hemorragia interna potencialmente mortal.',
    },
    {
      id: '1d601b60-b52b-412c-af69-b9d56882023e',
      name: 'Taponamiento Cardíaco',
      description:
        'Una condición en la que se acumula líquido en el espacio pericárdico, a menudo debido a un trauma, comprimiendo el corazón y afectando su capacidad para bombear sangre.',
    },
    {
      id: '0ecf3472-677d-4836-9aba-ac5677cc76bc',
      name: 'Lesión Valvular',
      description:
        'Daño a una o más válvulas del corazón, que puede ocurrir debido a un trauma y puede interrumpir el flujo sanguíneo normal.',
    },
    {
      id: '3879465e-e951-4837-948b-c1d1993e985c',
      name: 'Lesión de las Arterias Coronarias',
      description:
        'Lesión en las arterias coronarias, que puede ocurrir en situaciones de trauma y puede llevar a isquemia o infarto de miocardio.',
    },
    {
      id: 'eccb928e-39b5-43f5-bd1d-dd49ed7ce6c4',
      name: 'Lesión de la Pared Torácica',
      description:
        'Lesiones en la pared torácica, como fracturas de costillas, que pueden afectar el corazón y los pulmones y complicar la función cardíaca.',
    },
    {
      id: 'e66333de-1521-4c6e-923f-7f282f995f02',
      name: 'Lesión Eléctrica',
      description:
        'Lesión en el corazón debido a una descarga eléctrica, que puede llevar a arritmias o paro cardíaco.',
    },
    {
      id: 'b28d9e65-3368-4900-a972-0c8e36cfc655',
      name: 'Ruptura Cardíaca',
      description:
        'Una condición rara pero potencialmente mortal en la que el músculo cardíaco se desgarra, a menudo después de un infarto de miocardio o trauma.',
    },
    {
      id: '9ddefb35-2a39-42bb-9027-4ba51665a91a',
      name: 'Lesión Cardíaca Penetrante',
      description:
        'Lesión en el corazón causada por un trauma penetrante, como heridas de bala o cuchilladas, que puede ser fatal sin un tratamiento rápido.',
    },
  ],
  treatments: [
    {
      id: '0108bbdd-fd79-4303-9121-8ba554314ae7',
      name: 'Medicamentos Antihipertensivos',
      description:
        'Fármacos utilizados para controlar la hipertensión arterial y reducir el riesgo de enfermedades cardíacas.',
    },
    {
      id: '11f8996b-59db-4846-bd22-538573a8b3f4',
      name: 'Angioplastia',
      description:
        'Procedimiento mínimamente invasivo que abre arterias coronarias bloqueadas para mejorar el flujo sanguíneo al corazón.',
    },
    {
      id: '53c2d415-38a8-40e4-a59f-ccb4ce07fb84',
      name: 'Bypass Coronario',
      description:
        'Cirugía que crea un nuevo camino para el flujo sanguíneo al corazón al utilizar un vaso sanguíneo de otra parte del cuerpo.',
    },
    {
      id: '28cf07b4-5679-4826-b8e2-097684fab8a8',
      name: 'Marcapasos',
      description:
        'Dispositivo implantable que regula el ritmo cardíaco en pacientes con arritmias o ritmos cardíacos anormales.',
    },
    {
      id: '5e4ee899-5dfb-4a07-a56c-93dc8bd7f127',
      name: 'Desfibrilación',
      description:
        'Tratamiento que utiliza una descarga eléctrica para restablecer un ritmo cardíaco normal en casos de arritmias severas.',
    },
    {
      id: '0afdadda-871f-4857-a634-8994beff2e34',
      name: 'Terapia de Rehabilitación Cardíaca',
      description:
        'Programa supervisado que incluye ejercicio, educación y apoyo emocional para ayudar a los pacientes a recuperarse de enfermedades cardíacas.',
    },
    {
      id: '78c1db52-29bb-4d08-8b31-472cf245de63',
      name: 'Intervención Quirúrgica de Válvulas',
      description:
        'Procedimientos para reparar o reemplazar válvulas cardíacas dañadas para restaurar el flujo sanguíneo normal.',
    },
    {
      id: '0333cb0c-3c7b-4e42-b8e3-4ef12376c61d',
      name: 'Ablación Cardíaca',
      description:
        'Procedimiento que utiliza energía para destruir áreas del corazón que causan arritmias.',
    },
    {
      id: '9c98941f-7d06-40e6-ae02-e0ba3619f0bc',
      name: 'Tratamiento con Estatinas',
      description:
        'Uso de medicamentos que ayudan a reducir el colesterol y disminuir el riesgo de enfermedades cardíacas.',
    },
    {
      id: 'b93141eb-055d-4a67-b302-fc248a39347b',
      name: 'Control de la Diabetes',
      description:
        'Manejo adecuado de la diabetes para prevenir complicaciones cardíacas en pacientes diabéticos.',
    },
  ],
  pathologies: [
    {
      id: '844e7eaa-20f5-45b0-bd35-758ec1fbaf33',
      name: 'Cardiopatía Isquémica',
      description:
        'Condición caracterizada por un suministro insuficiente de sangre al corazón, a menudo debido a enfermedad arterial coronaria.',
    },
    {
      id: 'e23f5b4a-aa41-4720-a776-b036957eec7f',
      name: 'Dislipidemia',
      description:
        'Alteración en los niveles de lípidos en sangre, como colesterol y triglicéridos, que aumenta el riesgo de enfermedad cardiovascular.',
    },
    {
      id: '780c4907-56f5-46b2-84be-32e3382c3602',
      name: 'Pericarditis',
      description:
        'Inflamación del pericardio, la membrana que rodea el corazón, que puede causar dolor y dificultad para respirar.',
    },
    {
      id: 'fe5816bb-d297-4569-8937-5ba90e3d9066',
      name: 'Endocarditis',
      description:
        'Infección del endocardio, la capa interna del corazón, que puede dañar las válvulas cardíacas y provocar complicaciones graves.',
    },
    {
      id: '9da77d50-9fff-42b7-8ecf-8ddf09ec201d',
      name: 'Síndrome de Brugada',
      description:
        'Trastorno genético que puede causar arritmias potencialmente mortales y aumenta el riesgo de muerte súbita.',
    },
    {
      id: 'c883a020-f1b8-4266-b16b-6ef5c467e250',
      name: 'Síndrome Coronario Agudo',
      description:
        'Conjunto de condiciones que resultan de la disminución del flujo sanguíneo al corazón, incluyendo angina inestable e infarto de miocardio.',
    },
    {
      id: '78bf08a1-168c-4f76-9910-ec638ca8aeb5',
      name: 'Tromboembolismo Pulmonar',
      description:
        'Obstrucción de una arteria en los pulmones por un coágulo de sangre, que puede ser originado en el corazón y afectar la función cardíaca.',
    },
    {
      id: '3bc46f7e-8fd3-4020-a54c-6c3969346099',
      name: 'Cardiopatía Hipertrófica',
      description:
        'Enfermedad del músculo cardíaco que provoca un engrosamiento anormal de las paredes del corazón, afectando su función.',
    },
    {
      id: '',
      name: 'Aneurisma de la Aorta',
      description:
        'Dilatación anormal de la pared de la aorta, que puede llevar a complicaciones graves si se rompe.',
    },
    {
      id: 'f10778ef-574d-49d3-9378-0302f441722f',
      name: 'Taquicardia Ventricular',
      description:
        'Ritmo cardíaco rápido originado en los ventrículos, que puede ser potencialmente mortal si no se trata rápidamente.',
    },
  ],
  symptoms: [
    {
      id: 'f1fa2e47-4f26-4fbb-a4ab-733d85da3247',
      name: 'Hipertensión Arterial',
      description:
        'Condición en la que la presión arterial está persistentemente elevada, aumentando el riesgo de enfermedades cardíacas y accidentes cerebrovasculares.',
    },
    {
      id: '1c42173f-870b-4b8a-8903-7cf9e79417ea',
      name: 'Enfermedad Arterial Coronaria',
      description:
        'Enfermedad causada por la acumulación de placa en las arterias coronarias, lo que reduce el flujo sanguíneo al corazón.',
    },
    {
      id: 'b5dc92f4-b711-4f52-8f71-a6b3a66e7c9c',
      name: 'Insuficiencia Cardíaca',
      description:
        'Condición crónica en la que el corazón no puede bombear suficiente sangre para satisfacer las necesidades del cuerpo.',
    },
    {
      id: '12ba4f04-75c2-44b5-8350-0ec83ec86652',
      name: 'Fibrilación Auricular',
      description:
        'Ritmo cardíaco irregular y a menudo rápido que puede aumentar el riesgo de accidentes cerebrovasculares y otras complicaciones cardíacas.',
    },
    {
      id: '2674c531-1fa4-4be6-a2c9-f115f22cbb20',
      name: 'Infarto de Miocardio',
      description:
        'Comúnmente conocido como ataque al corazón, ocurre cuando el flujo sanguíneo a una parte del corazón está bloqueado, causando daño al músculo cardíaco.',
    },
    {
      id: '9c4b339d-9182-4911-86d5-85e8240cf42c',
      name: 'Enfermedad Valvular Cardíaca',
      description:
        'Afección que implica daño a una o más válvulas del corazón, lo que puede interrumpir el flujo sanguíneo normal.',
    },
    {
      id: '1e2b1a7c-cea7-4ec2-9fca-91bf04d19d87',
      name: 'Enfermedad Cardiaca Congénita',
      description:
        'Una serie de defectos en la estructura del corazón presentes al nacer, que pueden afectar el flujo sanguíneo a través del corazón.',
    },
    {
      id: 'c6b8e73c-7063-4b8c-b170-b1187782f876',
      name: 'Arritmia',
      description:
        'Ritmo cardíaco irregular que puede causar diversos síntomas y complicaciones, incluyendo accidentes cerebrovasculares o insuficiencia cardíaca.',
    },
  ],
};

export default installationModule;
