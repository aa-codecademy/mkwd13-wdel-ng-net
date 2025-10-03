import { Ingredient, IngredientBE } from '../enums/ingredints.enum';
import { PizzaSize } from '../enums/pizza-size.enum';

// Pizza response that we receive from the server
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

// Pizza ayload that will be sent to the server}
export interface PizzaBE {
  name: string;
  price: number;
  ingredients: IngredientBE[];
  description: string;
}
