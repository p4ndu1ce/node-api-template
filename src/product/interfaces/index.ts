export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: Array<string>;
  price: {
    currency: string;
    value: number;
  };
  images: Array<string>;
  level: number;
}