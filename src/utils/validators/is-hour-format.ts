import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Este es un validador para class-validator que verifica
 * si el valor de una propiedad esta en formato horario militar.
 * Ej: 1:20, Ej: 23:10
 */
@ValidatorConstraint({ name: 'IsHourFormat', async: false })
export class IsHourFormat implements ValidatorConstraintInterface {
  validate(text: string) {
    const parts = text.split(':');
    if (parts.length !== 2) return false;
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    if (isNaN(hours) || isNaN(minutes)) return false;
    if (hours < 0 || hours > 23) return false;
    if (minutes < 0 || minutes > 59) return false;
    return true;
  }

  defaultMessage() {
    return `($value) is not a valid hour format, it needs to be in militar hour, ex: 1:20, ex: 23:10`;
  }
}
