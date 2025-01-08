export interface Cart {
  id: number;
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
  date: string;
  status: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}
