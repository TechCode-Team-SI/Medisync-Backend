import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';

type ApiFilterPropertyOptions = ApiPropertyOptions & { isOptional?: boolean };

export function ApiFilterProperty(props?: ApiFilterPropertyOptions) {
  return applyDecorators((data: any, propertyKey: string) => {
    const { name: propName, isOptional: propIsOptional, ...rest } = props || {};
    const name = propName || propertyKey;
    const isOptional = propIsOptional || true;
    const apiPropertyProps: ApiPropertyOptions = {
      name: `filters[${name}]${props?.isArray ? '[]' : ''}`,
      ...rest,
    };
    const ChosenApiProperty = isOptional ? ApiPropertyOptional : ApiProperty;
    return ChosenApiProperty(apiPropertyProps)(data, propertyKey);
  });
}
