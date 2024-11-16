import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export const WsValidationPipe = new ValidationPipe({
  exceptionFactory(validationErrors = []) {
    if (this.isDetailedOutputDisabled) {
      throw new WsException('Bad request');
    }
    const errors = this.flattenValidationErrors(validationErrors);
    throw new WsException(errors);
  },
});
