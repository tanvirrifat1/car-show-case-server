export type IServiceFilterRequest = {
  searchTerm?: string;
};

export const serviceSearchableFields: string[] = [
  'searchTerm',
  'name',
  'price',
  'limit',
  'page',
  'category',
];

export const serviceFilterableFields: string[] = [
  'searchTerm',
  'id',
  'limit',
  'page',
  'price',
  'category',
];
