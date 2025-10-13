import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PizzaService } from '../../services/pizza.service';
import { map, Observable } from 'rxjs';
import { Order } from '../../types/interfaces/order.interface';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss',
})
export class PreviousOrdersComponent {
  orders$: Observable<Order[]> = new Observable<Order[]>();
  constructor(private pizzaService: PizzaService) {}

  ngOnInit(): void {
    this.orders$ = this.pizzaService
      .getOrederForUser(true)
      .pipe(map((r: any) => r.result));

    // console.log(this.orders$);

    // this.orders$.subscribe((res) => {
    //   console.log(res);
    // });
  }
}
