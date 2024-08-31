import {
  ClassConstructor,
  TransformFnParams,
  plainToInstance,
} from 'class-transformer';

export const ObjectTransformer =
  <T>(cls: ClassConstructor<T>) =>
  ({ value }: TransformFnParams) =>
    value ? plainToInstance(cls, value) : undefined;
