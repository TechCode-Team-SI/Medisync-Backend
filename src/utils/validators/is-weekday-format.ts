import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { WeekDays } from '../weekdays.enum';

/**
 * Este es un validador para class-validator que verifica
 * si el valor de una propiedad esta en formato horario militar.
 * Ej: 1:20, Ej: 23:10
 */
@ValidatorConstraint({ name: 'IsWeekdayFormat', async: false })
export class IsWeekdayFormat implements ValidatorConstraintInterface {
  validate(text: string) {
    const weekdays = Object.keys(WeekDays);
    const providedDays = text.split('_');
    for (const day of providedDays) {
      if (!weekdays.includes(day)) {
        return false;
      }
    }
    return true;
  }

  defaultMessage() {
    return `($value) is not a valid hour format, it needs to be in militar hour, ex: 1:20, ex: 23:10`;
  }
}
