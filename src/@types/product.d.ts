export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  image_url: string;
  rating: {
    rate: number;
    count: number;
  };
}
