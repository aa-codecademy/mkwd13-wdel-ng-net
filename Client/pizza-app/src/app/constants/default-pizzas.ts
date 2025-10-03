import { Ingredient } from '../types/enums/ingredints.enum';
import { Pizza } from '../types/interfaces/pizza.interface';

// Default data for pizzas
export const defaultPizzas: Pizza[] = [
  {
    id: 1,
    name: 'Margherita',
    price: 5,
    description:
      'A classic with tomato sauce and mozzarella on a crispy crust.',
    image: '/assets/margherita.png',
    ingredients: [Ingredient.TOMATO_SAUCE, Ingredient.MOZZARELLA],
  },
  {
    id: 2,
    name: 'Neapolitan',
    price: 5,
    description:
      'Traditional pizza with tomato sauce, mozzarella, and savory ham.',
    image: '/assets/neapolitan.png',
    ingredients: [
      Ingredient.TOMATO_SAUCE,
      Ingredient.MOZZARELLA,
      Ingredient.HAM,
    ],
  },
  {
    id: 3,
    name: 'Quatro Formagi',
    price: 6,
    description:
      'A rich blend of four cheeses: Parmesan, Mozzarella, Blue Cheese, and Gorgonzola.',
    image: '/assets/quatro-formagi.png',
    ingredients: [
      Ingredient.PARMESAN,
      Ingredient.MOZZARELLA,
      Ingredient.BLUE_CHEESE,
      Ingredient.GORGONZOLA,
    ],
  },
  {
    id: 4,
    name: 'Bacon',
    price: 6,
    description:
      'A tasty combination of crispy bacon, tomato sauce, and mozzarella.',
    image: '/assets/bacon.png',
    ingredients: [
      Ingredient.BACON,
      Ingredient.TOMATO_SAUCE,
      Ingredient.MOZZARELLA,
    ],
  },
  {
    id: 5,
    name: 'Bianca',
    description: 'A simple, creamy pizza topped with rich sour cream.',
    price: 6,
    image: '/assets/bianca.png',
    ingredients: [Ingredient.SOUR_CREAM],
  },
  {
    id: 6,
    name: 'Capricciosa',
    price: 6,
    description:
      'A savory mix of ham, mushrooms, and mozzarella on tomato sauce.',
    image: '/assets/capri.png',
    ingredients: [
      Ingredient.HAM,
      Ingredient.TOMATO_SAUCE,
      Ingredient.MUSHROOMS,
      Ingredient.MOZZARELLA,
    ],
  },
  {
    id: 7,
    name: 'Mexicana',
    price: 6,
    description:
      'A spicy pizza with gorgonzola, pepperoni, olives, and chili peppers.',
    image: '/assets/mexicana.png',
    ingredients: [
      Ingredient.TOMATO_SAUCE,
      Ingredient.GORGONZOLA,
      Ingredient.OLIVES,
      Ingredient.PEPPERONI,
      Ingredient.CHILLI_PEPPER,
    ],
  },
  {
    id: 8,
    name: 'Pepperoni',
    price: 6,
    description: 'A classic pepperoni pizza with gorgonzola and tomato sauce.',
    image: '/assets/pepperoni.png',
    ingredients: [
      Ingredient.TOMATO_SAUCE,
      Ingredient.GORGONZOLA,
      Ingredient.PEPPERONI,
    ],
  },
  {
    id: 9,
    name: 'Tuna',
    price: 6,
    description: 'Tuna, onion, and mozzarella on a tomato sauce base.',
    image: '/assets/tuna.png',
    ingredients: [
      Ingredient.TOMATO_SAUCE,
      Ingredient.TUNA,
      Ingredient.MOZZARELLA,
      Ingredient.ONION,
    ],
  },
  {
    id: 10,
    name: 'Vegetariana',
    price: 6,
    description:
      'A veggie pizza with olives, mushrooms, and mozzarella on tomato sauce.',
    image: '/assets/vegetariana.png',
    ingredients: [
      Ingredient.TOMATO_SAUCE,
      Ingredient.MOZZARELLA,
      Ingredient.OLIVES,
      Ingredient.MUSHROOMS,
    ],
  },
];
