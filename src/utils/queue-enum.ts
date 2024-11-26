export enum QueueName {
  MAIL = 'mail',
  NOTIFICATION = 'notification',
}

export enum MailQueueOperations {
  NOTIFICATION = 'notification',
  CONFIRM_EMAIL = 'confirm-email',
  FORGOT_PASSWORD = 'forgot-password',
}

export enum NotificationQueueOperations {
  CREATE_FOR_MOBILE = 'create-for-mobile',
  CREATE_FOR_SPECIALTY = 'create-for-specialty',
  CREATE_FOR_USERS_BY_PERMISSIONS = 'create-for-permissions',
  CREATE_FOR_INDIVIDUALS = 'create-for-individuals',
}
