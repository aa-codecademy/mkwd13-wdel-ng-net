import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  // base path: localhost:4200
  {
    path: '',
    component: HomeComponent,
  },
];
