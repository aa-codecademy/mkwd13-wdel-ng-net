import { Pizza, PizzaBE } from './pizza.interface';

// Order response that we get from the server
export interface Order {
  id: number;
  userId: number;
  addressTo: string;
  pizzas: Pizza[];
  orderPrice: number;
  description: string;
  user: {
    username: string;
  };
}

// Order payload that we send to the server
export interface OrderBE {
  addressTo: string;
  pizzas: PizzaBE[]; // this must be PizzBE
  orderPrice: number;
  description: string;
}
