export interface ProductParams {
  searchTerm?: string;
  orderBy: string;
  brands: string[];
  types: string[];
  pageNumber: number;
  pageSize: number;
}