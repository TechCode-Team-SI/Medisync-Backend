type Treatments = Array<{
  id: string;
  name: string;
  description: string;
}>;

const treatments: Treatments = [
  {
    id: 'a1b2c3e4-8f1e-4d3b-9b8b-1f2e4d3b9b6a',
    name: 'Anticonceptivos hormonales',
    description:
      'Métodos que utilizan hormonas para prevenir la ovulación y regular el ciclo menstrual.',
  },
  {
    id: 'b2c3d4e5-8f1e-4d3b-9b8b-1f2e4d3b9b6b',
    name: 'Terapia de reemplazo hormonal',
    description:
      'Tratamiento que utiliza hormonas para aliviar los síntomas de la menopausia.',
  },
  {
    id: 'c3d4e5f6-8f1e-4d3b-9b8b-1f2e4d3b9b6c',
    name: 'Cirugía laparoscópica',
    description:
      'Procedimiento mínimamente invasivo para tratar quistes, miomas y endometriosis.',
  },
  {
    id: 'd4e5f6g7-8f1e-4d3b-9b8b-1f2e4d3b9b6d',
    name: 'Exámenes pélvicos regulares',
    description:
      'Evaluaciones periódicas para detectar problemas ginecológicos y mantener la salud reproductiva.',
  },
  {
    id: 'e5f6g7h8-8f1e-4d3b-9b8b-1f2e4d3b9b6e',
    name: 'Terapia física del suelo pélvico',
    description:
      'Ejercicios diseñados para fortalecer los músculos del suelo pélvico y tratar la incontinencia.',
  },
  {
    id: 'f6g7h8i9-8f1e-4d3b-9b8b-1f2e4d3b9b6f',
    name: 'Medicamentos antihipertensivos',
    description:
      'Fármacos utilizados para controlar la presión arterial, como los betabloqueadores y los inhibidores de ECA.',
  },
  {
    id: 'g7h8i9j0-8f1e-4d3b-9b8b-1f2e4d3b9b6g',
    name: 'Angioplastia coronaria',
    description:
      'Procedimiento para abrir arterias bloqueadas mediante un balón y colocar un stent si es necesario.',
  },
  {
    id: 'h8i9j0k1-8f1e-4d3b-9b8b-1f2e4d3b9b65',
    name: 'Rehabilitación cardíaca',
    description:
      'Programa de ejercicios y educación diseñado para mejorar la salud cardiovascular tras un evento cardíaco.',
  },
  {
    id: 'i9j0k1l2-8f1e-4d3b-9b8b-1f2e4d3b9b6i',
    name: 'Implantación de marcapasos',
    description:
      'Procedimiento para insertar un dispositivo que regula los latidos del corazón en casos de arritmias.',
  },
  {
    id: 'j0k1l2m3-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Cirugía de revascularización coronaria',
    description:
      'Intervención quirúrgica que crea un nuevo camino para el flujo sanguíneo al corazón mediante injertos.',
  },
  {
    id: 'k1l2m3n4-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Vacunación',
    description:
      'Administración de vacunas para prevenir enfermedades infecciosas comunes.',
  },
  {
    id: 'l2m3n4o5-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Antibióticos',
    description: 'Uso de antibióticos para combatir infecciones bacterianas.',
  },
  {
    id: 'm3n4o5p6-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Control de diabetes',
    description:
      'Manejo de la diabetes mediante insulina, medicamentos orales y cambios en la dieta.',
  },
  {
    id: 'n4o5p6q7-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Terapia física',
    description:
      'Tratamientos físicos para mejorar el movimiento y reducir el dolor en diversas condiciones.',
  },
  {
    id: 'o5p6q7r8-8f1e-4d3c-b7a0-d2a5c7a0c7a0',
    name: 'Consejería nutricional',
    description:
      'Orientación sobre hábitos alimenticios saludables para prevenir enfermedades crónicas.',
  },
  {
    id: 'p6q7r8s9-a12c-b34d-e56g-h78i90j12k34',
    name: 'Inmunización infantil',
    description:
      'Vacunas administradas a niños para proteger contra enfermedades prevenibles.',
  },
  {
    id: 'q7r8s9t0-a23c-b45d-e67g-h89i01j23k45',
    name: 'Tratamiento de deshidratación',
    description:
      'Rehidratación oral o intravenosa en casos de deshidratación severa en niños.',
  },
  {
    id: 'r8s9t0u1-a34c-b56d-e78g-h90i12j34k56',
    name: 'Terapia del habla y lenguaje',
    description:
      'Intervenciones para ayudar a niños con dificultades en el habla o el lenguaje.',
  },
  {
    id: 's9t0u1v2-a45c-b67d-e89g-h01i23j45k67',
    name: 'Manejo del asma',
    description:
      'Plan de tratamiento que incluye inhaladores y educación sobre el control del asma.',
  },
  {
    id: 't0u1v2w3-a56c-b78d-e90g-h12i34j56k78',
    name: 'Evaluación del desarrollo infantil',
    description:
      'Exámenes regulares para monitorear el crecimiento y desarrollo adecuado en niños.',
  },
  {
    id: 'v2w3x4y5-a23c-b45d-e67g-h89i01j23k45',
    name: 'Analgésicos',
    description:
      'Medicamentos que alivian el dolor, incluyendo opciones como el paracetamol y los antiinflamatorios no esteroides (AINEs).',
  },
  {
    id: 'w3x4y5z6-a34c-b56d-e78g-h90i12j34k56',
    name: 'Antiinflamatorios',
    description:
      'Medicamentos que reducen la inflamación y el dolor, como el ibuprofeno y la aspirina.',
  },
  {
    id: 'y5z6a7a8-a56c-b78d-e90g-h12i34j56k78',
    name: 'Cirugía',
    description:
      'Intervenciones quirúrgicas para reparar, extirpar o tratar condiciones médicas específicas.',
  },
  {
    id: 'k1l2m3n4-a12c-b34d-e56g-h78i90j12k34',
    name: 'Inmovilización',
    description:
      'Uso de férulas o yesos para estabilizar huesos fracturados o esguinces mientras sanan.',
  },
  {
    id: 'h8i9j0k1-8f1e-4d3b-9b8b-1f2e4d3b9b6h',
    name: 'Diuréticos',
    description:
      'Medicamentos que ayudan a eliminar el exceso de agua y sal del cuerpo, utilizados en casos de hipertensión e insuficiencia cardíaca.',
  },
  {
    id: 'i9j0k1l2-8f1e-4d3b-9b9b-1f2e4d3b9b6i',
    name: 'Antidepresivos',
    description:
      'Medicamentos utilizados para tratar trastornos del estado de ánimo, como la depresión y la ansiedad.',
  },
];

export default treatments;
