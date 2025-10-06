import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../types/interfaces/auth.inetrface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hidePassword: boolean = true;

  // newer way of injecting servces instead of injecting them in constructor
  // private authService = inject(AuthService);

  constructor(private authService: AuthService) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get hasNameRequiredError(): boolean {
    return !!(
      this.loginForm.get('username')?.hasError('required') &&
      (this.loginForm.get('username')?.touched ||
        this.loginForm.get('username')?.dirty)
    );
  }

  get hasPasswordRequiredError(): boolean {
    return !!(
      this.loginForm.get('password')?.hasError('required') &&
      (this.loginForm.get('password')?.touched ||
        this.loginForm.get('password')?.dirty)
    );
  }

  onLogin() {
    this.authService.login(this.loginForm.value as Login).subscribe();
  }
}
