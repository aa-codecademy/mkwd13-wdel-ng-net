import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Pizza } from '../types/interfaces/pizza.interface';
import { Ingredient } from '../types/enums/ingredints.enum';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/app.constants';

@Injectable({
  providedIn: 'root', // This means that the service will be available in the whole application. It's deprecated, and will be set to 'root' as default in the following version of Angular.
})
export class PizzaService {
  activeOrder = signal<Pizza[]>([]);
  selectedIngredients = signal<Ingredient[]>([]);

  constructor(private http: HttpClient) {}

  getSavedPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${apiUrl}/Pizza`);
  }
}
