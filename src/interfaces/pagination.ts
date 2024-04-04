export type Pagination<T extends Record<string, any>> = {
  data: T[];
  metadata: {
    page: number;
    per_page: number;
    count: number;
  };
};

export type PaginationFormQueryParams = {
  page?: string;
  per_page?: string;
};

export type PaginationParams = {
  page: number;
  per_page: number;
};
