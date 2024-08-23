import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Este es un validador para class-validator que verifica
 * que el string no tenga el prefijo del sistema, de esta forma evitamos
 * que recursos creado por el usuario entren en conflicto con los paquetes
 * de instalacion del sistema.
 */
@ValidatorConstraint({ name: 'SystemPrefixNotAllowed', async: false })
export class SystemPrefixNotAllowed implements ValidatorConstraintInterface {
  validate(text: string) {
    const prefix = process.env.INSTALL_PREFIX;
    if (!prefix) return true;
    return !text.startsWith(prefix);
  }

  defaultMessage() {
    return `($value) is using a reserved system prefix, please change it`;
  }
}
