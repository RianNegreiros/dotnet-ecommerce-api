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