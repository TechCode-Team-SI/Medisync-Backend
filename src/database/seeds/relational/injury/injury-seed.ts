type Injury = Array<{
  id: string;
  name: string;
  description: string;
}>;

const injuries: Injury = [
  {
    id: 'a1b2c3e4-8f1e-4d3b-9b8b-1f2e4d3b9b6a',
    name: 'Fractura',
    description:
      'Ruptura de un hueso que puede ocurrir por un impacto o estrés repetido.',
  },
  {
    id: 'b2c3d4e5-8f1e-4d3b-9b8b-1f2e4d3b9b6b',
    name: 'Esguince',
    description:
      'Estiramiento o desgarro de los ligamentos, común en tobillos y rodillas.',
  },
  {
    id: 'c3d4e5f6-8f1e-4d3b-9b8b-1f2e4d3b9b6c',
    name: 'Distensión muscular',
    description:
      'Tirón o desgarro de un músculo o tendón, a menudo por esfuerzo excesivo.',
  },
  {
    id: 'd4e5f6g7-8f1e-4d3b-9b8b-1f2e4d3b9b6d',
    name: 'Dislocación',
    description:
      'Separación de los huesos en una articulación, causando dolor intenso.',
  },
  {
    id: 'e5f6g7h8-8f1e-4d3b-9b8b-1f2e4d3b9b6e',
    name: 'Tendinitis',
    description:
      'Inflamación de un tendón, a menudo causada por movimientos repetitivos.',
  },
  {
    id: 'f6g7h8i9-8f1e-4d3b-9b8b-1f2e4d3b9b6f',
    name: 'Bursitis',
    description:
      'Inflamación de la bursa, un saco lleno de líquido que amortigua las articulaciones.',
  },
  {
    id: 'g7h8i9j0-8f1e-4d3b-9b8b-1f2e4d3b9b6g',
    name: 'Contusión',
    description:
      'Lesión causada por un golpe que provoca hematomas y dolor en el área afectada.',
  },
  {
    id: 'h8i9j0k1-8f1e-4d3b-9b8b-1f2e4d3b9b6h',
    name: 'Calambre muscular',
    description:
      'Contracción involuntaria y dolorosa de un músculo, común tras el ejercicio intenso.',
  },
  {
    id: 'i9j0k1l2-8f1e-4d3b-9b8b-1f2e4d3b9b6i',
    name: 'Contractura muscular',
    description:
      'Dificultad para mover un músculo debido a una tensión excesiva o lesión.',
  },
  {
    id: 'j0k1l2m3-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Rotura fibrilar',
    description:
      'Desgarro parcial de fibras musculares, a menudo acompañado de dolor agudo.',
  },
  {
    id: 'k1l2m3n4-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Lesiones en cervicales y cuello',
    description:
      'Dolor y rigidez en la región cervical, a menudo debido a lesiones por impacto o mala postura.',
  },
  {
    id: 'l2m3n4o5-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Lesiones en la muñeca',
    description:
      'Lesiones comunes como esguinces y fracturas debido a caídas o impactos directos.',
  },
  {
    id: 'm3n4o5p6-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Lesiones en el hombro',
    description:
      'Incluyen tendinitis y desgarros del manguito rotador, comunes en deportes que implican lanzamientos.',
  },
  {
    id: 'n4o5p6q7-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Lesiones en la rodilla',
    description:
      'Esguinces y lesiones del ligamento cruzado anterior (LCA) son comunes en deportes de contacto.',
  },
  {
    id: 'o5p6q7r8-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Lesiones en el tobillo',
    description:
      'Esguinces y fracturas son frecuentes debido a torceduras o caídas.',
  },
  {
    id: 'p6q7r8s9-a12c-b34d-e56g-h78i90j12k34',
    name: 'Lesiones por sobreuso',
    description:
      'Condiciones como tendinitis y bursitis que resultan del uso repetitivo de una parte del cuerpo.',
  },
  {
    id: 'q7r8s9t0-a23c-b45d-e67g-h89i01j23k45',
    name: 'Fracturas por estrés',
    description:
      'Pequeñas fisuras en los huesos causadas por el uso excesivo, común en deportistas.',
  },
  {
    id: 'r8s9t0u1-a34c-b56d-e78g-h90i12j34k56',
    name: 'Lesiones en la espalda baja',
    description:
      'Dolores y lesiones musculares que pueden resultar de levantamiento inadecuado o mala postura.',
  },
];

export default injuries;
