import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PizzaSize } from '../../types/enums/pizza-size.enum';
import { PizzaService } from '../../services/pizza.service';
import { MatStepper } from '@angular/material/stepper';
import { Ingredient } from '../../types/enums/ingredints.enum';
import { calculatePizzaPrice } from '../../helpers/pizza.helper';
import { NormalizeEnumPipe } from '../../pipes/normalize-enum.pipe';

@Component({
  selector: 'app-selected-ingredients',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    NormalizeEnumPipe,
  ],
  templateUrl: './selected-ingredients.component.html',
  styleUrl: './selected-ingredients.component.scss',
})
export class SelectedIngredientsComponent {
  // List of all selected ingredients. Inputs should NEVER be mutated (changed) in the component, rather from the parent component that is passing the data in.
  selectedIngredients = input<Ingredient[]>([]);
  // Event emitter that will emit the ingredient that is to be deleted from the list of selected ingredients.
  handleDeleteIngredient = output<Ingredient>();

  size: PizzaSize = PizzaSize.MEDIUM;
  activeOrder = computed(() => this.pizzaService.activeOrder());

  constructor(
    private pizzaService: PizzaService,
    private matStepper: MatStepper
  ) {}

  onDeleteIngredient(ingredient: Ingredient) {
    // Emit the ingredient that is to be deleted from the list of selected ingredients.
    this.handleDeleteIngredient.emit(ingredient);
  }

  onSizeChange(event: any) {
    this.size = event.value;
  }

  savePizza() {
    this.pizzaService.updateActiveOrder([
      ...this.activeOrder(),
      {
        id: Date.now(),
        size: this.size,
        ingredients: this.selectedIngredients(),
        description: 'Description',
        name: 'Pizza',
        image: '',
        price: calculatePizzaPrice(this.size, this.selectedIngredients()),
      },
    ]);
    setTimeout(() => {
      this.matStepper.next();
    });

    this.selectedIngredients().forEach((i) => {
      this.handleDeleteIngredient.emit(i);
    });
  }

  savePizzaAndMakeAnother() {
    this.pizzaService.updateActiveOrder([
      ...this.activeOrder(),
      {
        id: Date.now(),
        size: this.size,
        ingredients: this.selectedIngredients(),
        description: 'Description',
        name: 'Pizza',
        image: '',
        price: calculatePizzaPrice(this.size, this.selectedIngredients()),
      },
    ]);

    this.selectedIngredients().forEach((i) => {
      this.handleDeleteIngredient.emit(i);
    });
  }

  onReset() {
    this.selectedIngredients().forEach((i) => {
      this.handleDeleteIngredient.emit(i);
    });
  }
}
