import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  data: T[];
  prevPage?: string | null;
  nextPage?: string | null;
  currentPage: number;
  totalPages: number;
}

export function PaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: String,
      example: 'https://api.example.com/api/v1/resource?page=3',
    })
    nextPage?: string | null;

    @ApiProperty({
      type: String,
      example: 'https://api.example.com/api/v1/resource?page=1',
    })
    prevPage?: string | null;

    @ApiProperty({
      type: Number,
      example: 2,
    })
    currentPage: number;

    @ApiProperty({
      type: Number,
      example: 20,
    })
    totalPages: number;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `Pagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
