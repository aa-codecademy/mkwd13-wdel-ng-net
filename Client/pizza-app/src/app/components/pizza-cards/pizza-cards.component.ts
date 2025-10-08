import { Component } from '@angular/core';
import { Pizza } from '../../types/interfaces/pizza.interface';
import { defaultPizzas } from '../../constants/default-pizzas';
import { CommonModule } from '@angular/common';
import { PizzaCardComponent } from '../pizza-card/pizza-card.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-pizza-cards',
  standalone: true,
  imports: [CommonModule, MatGridListModule, PizzaCardComponent],
  templateUrl: './pizza-cards.component.html',
  styleUrl: './pizza-cards.component.scss',
})
export class PizzaCardsComponent {
  pizzas: Pizza[] = []; // this represents the list of pizzas to be displayed in the grid list
  breakPoint: number = 3; // this represents the number of columns in the grid list

  ngOnInit() {
    this.pizzas = defaultPizzas;
  }

  onResize(event: any) {
    // this function is called whenever the window is resized because of the (window:resize) event listener in the template
    this.breakPoint = Math.floor(event.target.innerWidth / 320);
  }
}
