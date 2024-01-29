export type ICarFilterRequest = {
  searchTerm?: string;
};

export const CarSearchableFields: string[] = [
  'searchTerm',
  'name',
  'price',
  'limit',
  'page',
  'category',
];

export const CarFilterableFields: string[] = [
  'searchTerm',
  'id',
  'limit',
  'page',
  'price',
  'category',
];
