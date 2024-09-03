import { FieldQuestionType } from 'src/database/seeds/relational/question/question-seed';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';

export const fieldQuestionsModule: { fieldQuestions: FieldQuestionType[] } = {
  fieldQuestions: [
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
      id: 'd2d0ed44-c96d-402b-bb21-554904e32249',
      name: 'medicamentos actuales',
      slug: 'medicamentos-actuales',
      label: 'Medicamentos Actuales:',
      description:
        'Por favor, liste los medicamentos que está tomando actualmente',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
    // Hábitos
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
      name: 'realiza actividad fisica regularmente',
      slug: 'realiza-actividad-física-regularmente',
      label: '¿Realiza actividad física regularmente?',
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
      id: '84bba127-b43f-43f1-b4e7-0ff24016fdfa',
      name: 'alimentacion',
      slug: 'alimentacion',
      label: '¿Come balanceado?',
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
      id: '21181532-f034-4238-b12d-41d6063f337f',
      name: 'sueño',
      slug: 'sueño',
      label: '¿Duerme bien?',
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
    // Medicina General
    {
      id: 'e4316905-c289-4f31-9821-59173886e789',
      name: 'razon de la consulta',
      slug: 'razon-de-la-consulta',
      label: 'Razón de la consulta',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: false,
      },
      selections: [
        {
          value: 'Control de rutina',
        },
        {
          value: 'Nuevos síntomas',
        },
        {
          value: 'Referencia médica',
        },
      ],
    },
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
    // Cirugía
    {
      id: '5125208d-34c1-474c-a37d-97d29faf01df',
      name: 'Tipo de cirugia',
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
    {
      id: 'ad7fadb0-e5df-4b67-a0f7-19c03aeaa222',
      name: 'valoracion medica',
      slug: 'valoracion-medica',
      label: '¿El paciente posee valoración médica?',
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
      id: '5d7b495c-8669-4b3b-9197-3b45bcb5c105',
      name: 'valoracion preoperatoria',
      slug: 'valoracion-preoperatoria',
      label: '¿El paciente posee valoración preoperatoria?',
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
    // Gineco-obstetricia
    {
      id: '888b9cc8-94a5-4548-b072-9ab2e28c5624',
      name: 'embarazada',
      slug: 'embarazada',
      label: '¿Está embarazada?',
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
        {
          value: 'No sé',
        },
      ],
    },
    {
      id: '114b6905-dbb1-4c14-a497-3a5461f29dcb',
      name: 'menopausia',
      slug: 'menopausia',
      label: '¿Está en la menopausia?',
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
        {
          value: 'No sé',
        },
      ],
    },
    {
      id: '3ef30b79-660f-4daf-802d-70ad9f0a245e',
      name: 'sintomas gineco-obstetricia',
      slug: 'sintomas-gineco-obstetricia',
      label: 'Seleccione los síntomas que presenta',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Dolor pélvico',
        },
        {
          value: 'Sangrado anormal',
        },
        {
          value: 'Dolor durante las relaciones sexuales',
        },
        {
          value: 'Dolor al orinar',
        },
        {
          value: 'Picazón o ardor vaginal',
        },
        {
          value: 'Bultos o masas en la zona genital',
        },
        {
          value: 'Otros',
        },
      ],
    },
    // Pediatría
    {
      id: 'dc173666-83e6-4bc7-80f8-9ee754f48ddd',
      name: 'vacunas',
      slug: 'vacunas',
      label: 'Seleccione las vacunas que ha recibido el paciente',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: false,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Pentavalente',
        },
        {
          value: 'Neumococo',
        },
        {
          value: 'Rotavirus',
        },
        {
          value: 'Triple viral',
        },
        {
          value: 'Varicela',
        },
        {
          value: 'VPH',
        },
        {
          value: 'Influenza',
        },
        {
          value: 'Toxoide tetánico',
        },
        {
          value: 'Otras',
        },
      ],
    },
    // Laboratorio
    {
      id: '9dcb87be-ffd6-4032-805a-92fa1e2fa39e',
      name: 'examenes',
      slug: 'examenes',
      label: 'Seleccione los exámenes a realizar',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Hematología completa',
        },
        {
          value: 'Perfil bioquímico',
        },
        {
          value: 'Perfil tiroideo',
        },
        {
          value: 'Pruebas de coagulación',
        },
        {
          value: 'Pruebas de orina',
        },
        {
          value: 'Pruebas de heces',
        },
        {
          value: 'Biopsias',
        },
        {
          value: 'Otros',
        },
      ],
    },
    {
      id: '56a44991-2d2b-45cf-8cc8-fb6f55de244f',
      name: 'examenes adicionales',
      slug: 'examenes-adicionales',
      label: 'Exámenes adicionales:',
      description:
        'Si seleccionó otros, por favor, escriba los exámenes que se realizará',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
    // Radiología
    {
      id: '59e9b92b-133a-41bc-a965-067dc30390ab',
      name: 'examenes radiologicos',
      slug: 'examenes-radiologicos',
      label: 'Seleccione los exámenes radiológicos a realizar',
      type: FieldQuestionTypeEnum.SELECTION,
      isRequired: true,
      selectionConfig: {
        isMultiple: true,
      },
      selections: [
        {
          value: 'Radiografías',
        },
        {
          value: 'Tomografía computarizada',
        },
        {
          value: 'Resonancia magnética',
        },
        {
          value: 'Ecografía',
        },
        {
          value: 'Fluoroscopia',
        },
        {
          value: 'Otros',
        },
      ],
    },
    // Farmacia
    {
      id: 'c05f6a70-f864-4d2e-a60d-e13fd1ea1937',
      name: 'farmacos',
      slug: 'farmacos',
      label: 'Farmacos:',
      description:
        'Por favor, introduzca los nombres de los fármacos requeridos',
      type: FieldQuestionTypeEnum.TEXT,
      isRequired: false,
    },
  ],
};
