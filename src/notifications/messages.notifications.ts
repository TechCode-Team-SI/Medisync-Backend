import { NotificationTypeEnum } from './notifications.enum';

export const MessagesContent = {
  general: {
    userNotified: {
      title: 'Notificación General',
      content: 'Se ha enviado una notificación a los usuarios seleccionados.',
    },
    errorOccurred: {
      title: 'Error',
      content: 'Ha ocurrido un error al procesar la solicitud.',
    },
  },
  ticket: {
    created: {
      title: 'Nuevo Ticket Creado',
      content: (Id: string) => `Se ha creado un nuevo ticket con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Ticket Cerrado',
      content: (Id: string) => `El ticket con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Ticket Actualizado',
      content: (Id: string) => `El ticket con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Tiket removido',
      content: (Id: string) => `El ticket ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  article: {
    create: {
      title: 'Nuevo articulo creado',
      content: (Id: string) => `Se ha creado un nuevo articulo ID: ${Id}`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Articulo removido',
      content: (Id: string) => `El articulo con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Articulo Actualizado',
      content: (Id: string) =>
        `El articulo  con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    userNoti: {
      title: 'Nuevo articulo disponible!',
      content: (title: string) =>
        `Se ha publicado un nuevo articulo en nuestra plataforma: ${title}.`,
    },
  },
  question: {
    created: {
      title: 'Nuevo cuestionario creado',
      content: (Id: string) =>
        `Se ha creado un nuevo cuestionario con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Cuestionario Cerrado',
      content: (Id: string) => `El cuestionario con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Cuestionario Actualizado',
      content: (Id: string) =>
        `El cuestionario con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Cuestionario removido',
      content: (Id: string) =>
        `El cuestionario con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  form: {
    created: {
      title: 'Nuevo formulario creado',
      content: (Id: string) =>
        `Se ha creado un nuevo formulario con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Formulario cerrado',
      content: (Id: string) => `El formulario con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Formulario actualizado',
      content: (Id: string) =>
        `El formulario con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Formulario removido',
      content: (Id: string) => `El formulario con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  specialty: {
    created: {
      title: 'Nueva especialidad creada',
      content: (Id: string) =>
        `Se ha creado una nueva especialidad con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Especialidad cerrada',
      content: (Id: string) => `La especialidad con ID: ${Id} ha sido cerrada.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Especialidad actualizada',
      content: (Id: string) =>
        `La especialidad con ID: ${Id} ha sido actualizada.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Especialidad removida',
      content: (Id: string) =>
        `La especialidad con ID: ${Id} ha sido removida.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  statistic: {
    created: {
      title: 'Nuevo formulario creado',
      content: (Id: string) =>
        `Se ha creado un nuevo formulario con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Formulario cerrado',
      content: (Id: string) => `El formulario con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Formulario actualizado',
      content: (Id: string) =>
        `El formulario con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Formulario cerrado',
      content: (Id: string) => `El formulario con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  treatment: {
    created: {
      title: 'Nuevo tratamiento creado',
      content: (Id: string) =>
        `Se ha creado un nuevo tratamiento con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Tratamiento cerrado',
      content: (Id: string) => `El tratamiento con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Tratamiento actualizado',
      content: (Id: string) =>
        `El tratamiento con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Tratamiento removido',
      content: (Id: string) => `El tratamiento con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  injurie: {
    created: {
      title: 'Nueva lesión registrada',
      content: (Id: string) =>
        `Se ha registrado una nueva lesión con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Lesión cerrada',
      content: (Id: string) => `La lesión con ID: ${Id} ha sido cerrada.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Lesión actualizada',
      content: (Id: string) => `La lesión con ID: ${Id} ha sido actualizada.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Lesión removida',
      content: (Id: string) => `La lesión con ID: ${Id} ha sido removida.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  pathologie: {
    created: {
      title: 'Nueva patologia registrada',
      content: (Id: string) =>
        `Se ha registrado una nueva patologia con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Patologia cerrada',
      content: (Id: string) => `La patologia con ID: ${Id} ha sido cerrada.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Patologia actualizada',
      content: (Id: string) =>
        `La patologia con ID: ${Id} ha sido actualizada.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Patologia removida',
      content: (Id: string) => `La patologia con ID: ${Id} ha sido removida.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  symptom: {
    created: {
      title: 'Nuevo sintoma registrado',
      content: (Id: string) =>
        `Se ha registrado un nuevo sintoma con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Sintoma cerrado',
      content: (Id: string) => `El sintoma con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Sintoma actualizado',
      content: (Id: string) => `El sintoma con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Sintoma removido',
      content: (Id: string) => `El sintoma con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  role: {
    created: {
      title: 'Nuevo rol creado',
      content: (Id: string) => `Se ha creado un nuevo rol con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Rol cerrado',
      content: (Id: string) => `El rol con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Rol actualizado',
      content: (Id: string) => `El rol con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Rol removido',
      content: (Id: string) => `El rol con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  area: {
    created: {
      title: 'Nueva area creada',
      content: (Id: string) => `Se ha creado una nueva area con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Area cerrada',
      content: (Id: string) => `El area con ID: ${Id} ha sido cerrada.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Area actualizada',
      content: (Id: string) => `El area con ID: ${Id} ha sido actualizada.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Area removida',
      content: (Id: string) => `El area con ID: ${Id} ha sido removida.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  agenda: {
    created: {
      title: 'Nueva agenda creada',
      content: (Id: string) =>
        `Se ha creado una nueva agenda con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Agenda cerrada',
      content: (Id: string) => `La agenda con ID: ${Id} ha sido cerrada.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Agenda actualizada',
      content: (Id: string) => `La agenda con ID: ${Id} ha sido actualizada.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Agenda removida',
      content: (Id: string) => `La agenda con ID: ${Id} ha sido removida.`,
      type: NotificationTypeEnum.WORK,
    },
  },
  schedule: {
    created: {
      title: 'Nuevo horario creado',
      content: (Id: string) =>
        `Se ha creado un nuevo horario con el ID: ${Id}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Horario cerrado',
      content: (Id: string) => `El horario con ID: ${Id} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Horario actualizado',
      content: (Id: string) => `El horario con ID: ${Id} ha sido actualizado.`,
      type: NotificationTypeEnum.WORK,
    },
    remove: {
      title: 'Horario removido',
      content: (Id: string) => `El horario con ID: ${Id} ha sido removido.`,
      type: NotificationTypeEnum.WORK,
    },
  },
};
