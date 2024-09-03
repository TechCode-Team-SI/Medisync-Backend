import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';

export const fieldQuestionsModule: { fieldQuestions: FieldQuestionType[] } = {
  fieldQuestions: [
    {
      id: '32619a4e-d31b-4c7a-951f-b0044367c66d',
      name: 'Razon de la visita',
      slug: 'razon-de-la-visita',
      label: 'Razon de la visita',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Chequeo Rutinario',
        },
        {
          value: 'Seguimiento',
        },
        {
          value: 'Nuevos Sintomas',
        },
        {
          value: 'Referencia de otro doctor',
        },
      ],
    },
    {
      id: '3ef30b79-660f-4daf-802d-70ad9f0a245e',
      name: 'Sintomas actuales',
      slug: 'sintomas-actuales',
      label:
        '¿Está experimentando alguno de los siguientes síntomas? (Marca todas las que apliquen)',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: false,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Dolor o molestia en el pecho',
        },
        {
          value: 'Dificultad para respirar',
        },
        {
          value: 'Palpitaciones o latidos irregulares',
        },
        {
          value: 'Mareos o desmayos',
        },
        {
          value: 'Hinchazón en las piernas o tobillos',
        },
        {
          value: 'Fatiga',
        },
      ],
    },
    {
      id: 'ed0ff37c-5ab6-41fd-afe9-c1b1d3728db1',
      name: 'diagnostico condiciones',
      slug: 'diagnostico-condiciones',
      label:
        '¿Le han diagnosticado alguna de las siguientes condiciones? (Marque todos los que apliquen)',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Presión arterial alta (Hipertensión)',
        },
        {
          value: 'Colesterol alto',
        },
        {
          value: 'Enfermedad coronaria',
        },
        {
          value: 'Ataque cardíaco (Infarto de miocardio)',
        },
        {
          value: 'Insuficiencia cardíaca',
        },
        {
          value: 'Arritmia (Latidos irregulares)',
        },
        {
          value: 'Derrame cerebral',
        },
        {
          value: 'Ninguna',
        },
      ],
    },
    {
      id: 'd1dbe2b6-e59f-4500-8ad2-56cfbd5763a3',
      name: 'cirugia procedimiento cardiaco anterior',
      slug: 'cirugia-procedimiento-cardiaco',
      label: '¿Ha tenido alguna cirugía o procedimiento cardíaco previo?',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Sí',
        },
        {
          value: 'No',
        },
      ],
    },
    {
      id: 'aa2760b1-b717-4886-bfdd-56c1bad6c2a0',
      name: 'medicamento corazon',
      slug: 'medicamento-corazon',
      label:
        '¿Está tomando actualmente algún medicamento relacionado con el corazón?',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Sí',
        },
        {
          value: 'No',
        },
      ],
    },
    {
      id: '05d8fee5-5aae-4468-ac35-772abab052f3',
      name: 'antecedentes cardiacas familiares',
      slug: 'antecedentes-cardiacas-familiares',
      label: '¿Tiene antecedentes familiares de enfermedades cardíacas?',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Sí',
        },
        {
          value: 'No',
        },
      ],
    },
    {
      id: 'b3f60cf8-8bfe-4b3b-89fa-4f75c6ec5011',
      name: 'fuma',
      slug: 'fuma',
      label: '¿Fuma?',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Sí',
        },
        {
          value: 'No',
        },
      ],
    },
    {
      id: '6ae67da0-3705-4fca-9486-ad340e83c8fc',
      name: 'consume alcohol',
      slug: 'consume-alcohol',
      label: '¿Consume alcohol?',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Sí',
        },
        {
          value: 'No',
        },
      ],
    },
    {
      id: '71f3064c-98a4-444c-ba3d-e8836c535d8e',
      name: 'ejercicio regularmente',
      slug: 'ejercicio-regularmente',
      label: '¿Hace ejercicio regularmente?',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Sí',
        },
        {
          value: 'No',
        },
      ],
    },
    {
      id: 'd2d0ed44-c96d-402b-bb21-554904e32249',
      name: 'medicamentos actuales',
      slug: 'medicamentos-actuales',
      label: 'Medicamentos Actuales:',
      description:
        'Por favor, liste los medicamentos que está tomando actualmente',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
    {
      id: '282e3b8e-6dfa-4642-bab8-a1ab4710566a',
      name: 'informacion adicional',
      slug: 'informacion-adicional',
      label: 'Información Adicional:',
      description:
        '¿Hay algo más que le gustaría que el cardiólogo supiera antes de su cita?',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
    {
      id: '32619a4e-d31b-4c7a-951f-b0044367c67e',
      name: 'Tipo de cirugía',
      slug: 'tipo-de-cirugia',
      label: 'Tipo de cirugía',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Electiva',
        },
        {
          value: 'Urgente',
        },
      ],
    },
    // Medicina General
    {
      id: 'e1a2a9c8-f809-405a-a55b-29e32fdf60c9',
      name: 'sintomas comunes',
      slug: 'sintomas-comunes',
      label: 'Seleccione los síntomas que presenta',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Fiebre',
        },
        {
          value: 'Dolor',
        },
        {
          value: 'Tos',
        },
        {
          value: 'Fatiga',
        },
        {
          value: 'Dolor de cabeza',
        },
        {
          value: 'Náuseas y vómitos',
        },
        {
          value: 'Dolor de garganta',
        },
        {
          value: 'Estreñimiento',
        },
        {
          value: 'Diarrea',
        },
        {
          value: 'Otros',
        },
      ],
    },
    {
      id: 'df556a8b-8dc9-4924-be86-ce8f934e8734',
      name: 'detalles adicionales',
      slug: 'detalles-adicionales',
      label: 'Detalles adicionales:',
      description: '¿Qué detalles debería saber el médico antes de atenderle?',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
    // Emergencia
    {
      id: '4c208d46-3240-4db7-a158-a1accd5b863a',
      name: 'Posibles causas',
      slug: 'posibles-causas',
      label: 'Seleccione la(s) posible(s) causa(s) de la emergencia',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Fracturas',
        },
        {
          value: 'Conmociones cerebrales',
        },
        {
          value: 'Heridas por arma blanca',
        },
        {
          value: 'Heridas por arma de fuego',
        },
        {
          value: 'Quemaduras',
        },
        {
          value: 'Intoxicaciones',
        },
        {
          value: 'Otras',
        },
      ],
    },
    {
      id: 'edf5c627-9a8b-43a9-b48a-59ab1d9d8e2d',
      name: 'descripcion del suceso',
      slug: 'descripcion-del-suceso',
      label: 'Descripción del suceso:',
      description: 'Por favor, explique de forma clara y concisa lo ocurrido',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
  ],
};
