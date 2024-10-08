import { TransformFnParams } from 'class-transformer';

const optionalBooleanMapper = {
  undefined: undefined,
  true: true,
  false: false,
};

export const BooleanTransformer = (params: TransformFnParams) =>
  optionalBooleanMapper[params.value];
