import { Component, computed } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../types/interfaces/pizza.interface';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { NormalizeEnumPipe } from '../../pipes/normalize-enum.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-preview-order',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    NormalizeEnumPipe,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './preview-order.component.html',
  styleUrl: './preview-order.component.scss',
})
export class PreviewOrderComponent {
  activeOrder = computed(() => this.pizzaService.activeOrder());

  constructor(private pizzaService: PizzaService) {}

  calculateTotalPrice(order: Pizza[] | null): number {
    if (!order) {
      return 0;
    }
    return order.reduce((sum, pizza) => (sum += pizza.price), 0);
  }

  onDeletePizza(index: number): void {
    // Delete pizza from order in the pizza service which has all the logic and information for the order
    this.pizzaService.deletePizzaFromOrder(index);
  }
}
