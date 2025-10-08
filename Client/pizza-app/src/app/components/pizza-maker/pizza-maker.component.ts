import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { PizzaService } from '../../services/pizza.service';
import { IngredientsComponent } from '../ingredients/ingredients.component';

@Component({
  selector: 'app-pizza-maker',
  standalone: true,
  imports: [CommonModule, MatStepperModule, IngredientsComponent],
  templateUrl: './pizza-maker.component.html',
  styleUrl: './pizza-maker.component.scss',
})
export class PizzaMakerComponent {
  // flag to enable/disable going to the next step
  hasOrders = computed(() => !!this.pizzaService.activeOrder().length);

  constructor(private pizzaService: PizzaService) {}
}
