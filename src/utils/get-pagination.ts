type GetPaginationType = {
  page?: number;
  limit?: number;
};

export function getPagination(query: GetPaginationType) {
  let page = query?.page ?? 1;
  let limit = query?.limit ?? 10;
  if (limit > 50) {
    limit = 50;
  }
  if (page < 1) {
    page = 1;
  }
  return { page, limit };
}
