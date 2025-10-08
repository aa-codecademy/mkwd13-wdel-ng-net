import { Component, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PizzaCardsComponent } from '../pizza-cards/pizza-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    PizzaCardsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    console.log('NgOnDestroy called');
  }
}
