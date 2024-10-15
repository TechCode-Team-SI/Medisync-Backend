import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';

type ApiSortPropertyOptions = ApiPropertyOptions & { isOptional?: boolean };

export function ApiSortProperty(props: ApiSortPropertyOptions) {
  return applyDecorators((data: any, propertyKey: string) => {
    const { name: propName, isOptional: propIsOptional, ...rest } = props;
    const name = propName || propertyKey;
    const isOptional = propIsOptional || true;
    const apiPropertyProps: ApiPropertyOptions = {
      name: `sort[0][${name}]`,
      ...rest,
    };
    const ChosenApiProperty = isOptional ? ApiPropertyOptional : ApiProperty;
    return ChosenApiProperty(apiPropertyProps)(data, propertyKey);
  });
}
