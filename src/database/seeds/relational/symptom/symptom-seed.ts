type Symptom = Array<{
  id: string;
  name: string;
  description: string;
}>;

const symptoms: Symptom = [
  {
    id: 'a1b2c3e4-8f1e-4d3b-9b8b-1f2e4d3b9b6a',
    name: 'Dolor pélvico',
    description:
      'Malestar en la región pélvica que puede ser causado por diversas condiciones ginecológicas.',
  },
  {
    id: 'b2c3d4e5-8f1e-4d3b-9b8b-1f2e4d3b9b6b',
    name: 'Sangrado vaginal anormal',
    description:
      'Cualquier sangrado que no sea parte del ciclo menstrual normal, incluyendo sangrado entre periodos.',
  },
  {
    id: 'c3d4e5f6-8f1e-4d3b-9b8b-1f2e4d3b9b6c',
    name: 'Síntomas de menopausia',
    description:
      'Cambios físicos y emocionales que ocurren durante la transición a la menopausia, como sofocos y cambios de humor.',
  },
  {
    id: 'd4e5f6g7-8f1e-4d3b-9b8b-1f2e4d3b9b6d',
    name: 'Infecciones vaginales',
    description:
      'Síntomas como picazón, ardor y secreción inusual, a menudo causados por hongos o bacterias.',
  },
  {
    id: 'e5f6g7h8-8f1e-4d3b-9b8b-1f2e4d3b9b6e',
    name: 'Dolor durante las relaciones sexuales',
    description:
      'Malestar o dolor experimentado durante el coito, que puede ser causado por diversas condiciones médicas.',
  },
  {
    id: 'f6g7h8i9-8f1e-4d3b-9b8b-1f2e4d3b9b6f',
    name: 'Dolor en el pecho',
    description:
      'Sensación de opresión o dolor en el área del pecho, que puede indicar problemas cardíacos.',
  },
  {
    id: 'g7h8i9j0-8f1e-4d3b-9b8b-1f2e4d3b9b6g',
    name: 'Fatiga extrema',
    description:
      'Cansancio inusual que puede ser un signo de insuficiencia cardíaca o problemas circulatorios.',
  },
  {
    id: 'h8i9j0k1-8f1e-4d3b-9b8b-1f2e4d3b9b6h',
    name: 'Palpitaciones',
    description:
      'Sensación de latidos cardíacos rápidos o irregulares, que pueden ser benignos o indicar arritmias.',
  },
  {
    id: 'i9j0k1l2-8f1e-4d3b-9b8b-1f2e4d3b9b6i',
    name: 'Mareos o desmayos',
    description:
      'Sensación de inestabilidad o pérdida de conciencia, a menudo relacionada con problemas cardiovasculares.',
  },
  {
    id: 'j0k1l2m3-8f1e-4d3b-9b8b-1f2e4d3b9b6j',
    name: 'Hinchazón en piernas y pies',
    description:
      'Acumulación de líquido en las extremidades inferiores, que puede ser un signo de insuficiencia cardíaca.',
  },
  {
    id: 'k1l2m3n4-8f1e-4d3b-9b8b-1f2e4d3b9c6a',
    name: 'Fiebre',
    description:
      'Aumento temporal de la temperatura corporal, comúnmente asociado con infecciones.',
  },
  {
    id: 'l2m3n4o5-8f1e-4d3b-9b8b-1f2e4d3c9c6a',
    name: 'Tos persistente',
    description:
      'Reflejo que ayuda a limpiar las vías respiratorias, puede ser síntoma de diversas condiciones respiratorias.',
  },
  {
    id: 'm3n4o5p6-8f1e-4d3b-9b8c-d2e5c7a0c7a0',
    name: 'Dolor de cabeza',
    description:
      'Malestar en la cabeza que puede variar en intensidad y duración, asociado a múltiples causas.',
  },
  {
    id: 'n4o5p6q7-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Náuseas y vómitos',
    description:
      'Sensación de malestar estomacal que puede llevar al vómito, frecuentemente asociado a infecciones o intoxicaciones.',
  },
  {
    id: 'o5p6q7r8-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Fatiga generalizada',
    description:
      'Sensación persistente de cansancio que no mejora con el descanso, común en muchas enfermedades.',
  },
  {
    id: 'q7r8s9t0-a12c-b34d-e56g-h78i90j12k34',
    name: 'Dificultad para respirar',
    description:
      'Problemas respiratorios que pueden incluir sibilancias o respiración rápida, comunes en asma o infecciones respiratorias.',
  },
  {
    id: 'r8s9t0u1-a23c-b45d-e67g-h89i01j23k45',
    name: 'Erupciones cutáneas',
    description:
      'Cambios visibles en la piel que pueden ser causados por alergias, infecciones o irritaciones.',
  },
  {
    id: 's9t0u1v2-a34c-b56d-e78g-h90i12j34k56',
    name: 'Dolor abdominal',
    description:
      'Malestar en el área del abdomen que puede tener múltiples causas, desde infecciones hasta problemas digestivos.',
  },
  {
    id: 't0u1v2w3-a45c-b67d-e89g-h01i23j45k67',
    name: 'Vómitos recurrentes',
    description:
      'Expulsión frecuente del contenido estomacal, común en infecciones gastrointestinales o intolerancias alimenticias.',
  },
];

export default symptoms;
