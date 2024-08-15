import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Este es un validador para class-validator que verifica
 * si el valor de una propiedad es parte de un array de strings.
 */
@ValidatorConstraint({ name: 'IsPartOfArray', async: false })
export class IsPartOfArray implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return args.constraints.includes(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `($value) is not a valid ${args.property}!`;
  }
}
