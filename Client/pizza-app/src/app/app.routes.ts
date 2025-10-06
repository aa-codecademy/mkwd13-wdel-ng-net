import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';

export const routes: Routes = [
  // base path: localhost:4200
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (module) => module.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (module) => module.LoginComponent
      ),
  },
  {
    path: 'not-allowed',
    component: NotAllowedComponent,
  },
  {
    path: '**', // evrithing else that is not listed in the routes above
    component: NotAllowedComponent,
  },
];
