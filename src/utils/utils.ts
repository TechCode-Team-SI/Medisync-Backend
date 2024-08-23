import { RolesEnum } from 'src/roles/roles.enum';
import { StandardEnum } from './types/generic-enum.type';

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function slugify(str: string) {
  return str.trim().toLowerCase().replace(/ /g, '-');
}

export function genRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * max + min);
}

export function genOTPCode() {
  const MIN = 1;
  const MAX = 9;
  const otpCode: number[] = [];
  for (let i = 0; i < 6; i++) {
    otpCode.push(genRandomNumber(MIN, MAX));
  }
  return otpCode.join('');
}

export function isRoleMutable(roleSlug: string) {
  return !Object.values(RolesEnum).some((role) => role === roleSlug);
}

export function isValueInEnum<T extends StandardEnum<unknown>>(
  enumLike: T,
  value: string | number,
) {
  return Object.values(enumLike).includes(value);
}
