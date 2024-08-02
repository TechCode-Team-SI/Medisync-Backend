import { IPaginationOptions } from './types/pagination-options';
import { PaginationResponseDto } from './dto/pagination-response.dto';
import { AppConfig } from 'src/config/app-config.type';
import appConfig from 'src/config/app.config';
import qs from 'qs';

const queryOptions = { encode: false, addQueryPrefix: true };

export const Pagination = <T>(
  data: { items: T[]; count: number },
  { domain, limit, page }: IPaginationOptions & { domain: string },
): PaginationResponseDto<T> => {
  const config = appConfig() as AppConfig;
  const totalPages = Math.ceil(data.count / limit);
  const currentPage = page;

  const baseUrl = `${config.backendDomain}/${domain}`;
  const queryNext = qs.stringify({ limit, page: page + 1 }, queryOptions);
  const queryPrev = qs.stringify({ limit, page: page - 1 }, queryOptions);

  const nextPage = currentPage < totalPages ? `${baseUrl}${queryNext}` : null;
  const prevPage = currentPage > 1 ? `${baseUrl}${queryPrev}` : null;
  return {
    data: data.items,
    nextPage,
    prevPage,
    totalPages,
    currentPage,
  };
};
