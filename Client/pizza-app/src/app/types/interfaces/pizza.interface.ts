import { Ingredient } from '../enums/ingredints.enum';
import { PizzaSize } from '../enums/pizza-size.enum';

export interface Pizza {
  id: number;
  name: string;
  price: number;
  description: string;
  size?: PizzaSize;
  image: string;
  // ingredients: Array<Ingredient>
  ingredients: Ingredient[];
}
