import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // A computed signal is a read-only signal that derives its value from other signals.
  // It is created using the computed() function and automatically recalculates its value whenever any of its dependent signals change
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(private authService: AuthService) {
    console.log('Constructor called');
  }

  // Lifecycle hook - logic that needs to be executed right after the component's inputs are loaded
  // Use it for initialization logic like api calls, loading necessary data for the component to run smoothly
  ngOnInit() {
    console.log('NgOnInit called');
  }

  // Lifecycle hook - invoked immediately after Angular has completed the initialization of a component's view (html) and its child views
  // Use it to perform operations that require direct access to the component's view or its child views
  ngAfterViewInit() {
    console.log('The component has been loaded');
  }

  onLogout(): void {
    this.authService.logout();
  }

  // Lifecycle hook - logic that needs to be executed right before the component is destroyed
  // Use it for clean up logic like unsubscribing to observables and subscriptions etc.
  ngOnDestroy() {
    console.log('NgOnDestroy called');
  }
}

// Check lifecycle hook documentation here: https://angular.dev/guide/components/lifecycle
