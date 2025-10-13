import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Ingredient } from '../../types/enums/ingredints.enum';
import { IngredientsListComponent } from '../ingredients-list/ingredients-list.component';
import { SelectedIngredientsComponent } from '../selected-ingredients/selected-ingredients.component';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsListComponent,
    SelectedIngredientsComponent,
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent {
  // Instead of keeping a separate ingredients array, use the signal directly from PizzaService.
  // ingredients = computed(() => !!this.pizzaService.selectedIngredients());
  ingredients = computed(() => this.pizzService.selectedIngredients());

  constructor(private pizzService: PizzaService) {}

  handleSelectIngredient(ingredients: Ingredient[]): void {
    // Use PizzaService's signal update method to update selected ingredients.
    this.pizzService.updateSelectedIngredients(ingredients);
  }

  handleDeleteIngredient(ingredient: Ingredient): void {
    // Remove the ingredient from the list and update the signal.
    const updatedIngredient = this.ingredients().filter(
      (i) => i !== ingredient
    );
    this.pizzService.updateSelectedIngredients(updatedIngredient);
  }
}
