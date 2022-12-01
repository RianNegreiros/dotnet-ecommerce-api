export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  pictureUrl: string;
  type?: string;
  brand: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}