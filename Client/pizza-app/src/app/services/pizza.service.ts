import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Pizza, PizzaBE } from '../types/interfaces/pizza.interface';
import { Ingredient } from '../types/enums/ingredints.enum';
import { catchError, Observable, of, tap } from 'rxjs';
import { apiUrl, snackBarConfig } from '../constants/app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, OrderBE } from '../types/interfaces/order.interface';
import { convertIngredientsToBe } from '../helpers/pizza.helper';

@Injectable({
  providedIn: 'root', // This means that the service will be available in the whole application. It's deprecated, and will be set to 'root' as default in the following version of Angular.
})
export class PizzaService {
  activeOrder = signal<Pizza[]>([]);
  selectedIngredients = signal<Ingredient[]>([]);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  updateActiveOrder(order: Pizza[]): void {
    this.activeOrder.set(order);
  }

  updateSelectedIngredients(ingredints: Ingredient[]): void {
    this.selectedIngredients.set(ingredints);
  }

  getSavedPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${apiUrl}/Pizza`);
  }

  getOrederForUser(isOrderForUser: boolean): Observable<Order[]> {
    const params = new HttpParams().set(
      'isOrderForUser',
      isOrderForUser.toString()
    );

    return this.http.get<Order[]>(`${apiUrl}/Order`, { params }).pipe(
      catchError((error) => {
        this.snackBar.open(
          error?.error?.errors?.[0] || `Error while fetching orders!`,
          'Close',
          snackBarConfig
        );
        return of([]);
      })
    );
  }

  submitOrder(addressTo: string, description: string): Observable<void> {
    const pizzas = this.activeOrder();

    // converting pizza object to fit BE body definition
    const mappedPizzas = pizzas.map((pizza) => ({
      name: pizza.name,
      description: pizza.description,
      price: Math.round(pizza.price), // workaround as BE doesn't accept decimals
      ingredients: convertIngredientsToBe(pizza.ingredients),
    })) satisfies PizzaBE[]; // use satisfies instead of 'as' to avoid type casting

    // as = assertion/cast. Tells TypeScript “trust me, this value is type X.” It changes the type and can lie (unsound if you’re wrong).
    // satisfies = constraint check. Asks TypeScript “does this value conform to type X?” It checks compatibility but keeps the original inferred type. No lying.
    // We use satisfies when we want to verify an object/expr conforms to a shape without changing its inferred type
    // We use as when we truly know the runtime type and need to coerce TS and accept the risko of mismatch

    const order = {
      pizzas: mappedPizzas,
      addressTo,
      description,
      orderPrice: Math.round(
        pizzas.reduce((acc, pizza) => acc + pizza.price, 0)
      ), // workaround as BE doesn't accept decimals
    } satisfies OrderBE;

    return this.http.post<void>(`${apiUrl}/Order`, order).pipe(
      tap(() => {
        this.snackBar.open(
          'You have successfgully created an order!',
          'Close',
          snackBarConfig
        );
      }),
      catchError((error) => {
        if (error) {
          this.snackBar.open(
            error?.error?.errors?.[0] || 'Error while making an order!',
            'Close',
            snackBarConfig
          );
        }
        return of();
      })
    );
  }

  deletePizzaFromOrder(id: number): void {
    const updatedOrder = this.activeOrder().filter((pizza) => pizza.id !== id);
    this.updateActiveOrder(updatedOrder);
  }

  deletePizza(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/Pizza/${id}`).pipe(
      tap(() => {
        this.snackBar.open(
          'Ypu have successfully deleted a pizza',
          'Close',
          snackBarConfig
        );
      }),
      catchError((error) => {
        this.snackBar.open(
          error?.error?.errors?.[0] || 'Error while deleting a pizza!',
          'Close',
          snackBarConfig
        );
        return of();
      })
    );
  }
}
