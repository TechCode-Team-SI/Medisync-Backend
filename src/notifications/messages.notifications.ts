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
      content: (ticketId: string) =>
        `Se ha creado un nuevo ticket con el ID: ${ticketId}.`,
      type: NotificationTypeEnum.WORK,
    },
    closed: {
      title: 'Ticket Cerrado',
      content: (ticketId: string) =>
        `El ticket con ID: ${ticketId} ha sido cerrado.`,
      type: NotificationTypeEnum.WORK,
    },
    updated: {
      title: 'Ticket Actualizado',
      content: (ticketId: string) =>
        `El ticket con ID: ${ticketId} ha sido actualizado.`,
      type: '',
    },
  },
};
