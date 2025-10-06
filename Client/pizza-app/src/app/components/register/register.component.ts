import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Register } from '../../types/interfaces/auth.inetrface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hidePassword: boolean = true;

  constructor(private authService: AuthService) {}

  registerForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  // Getters for form validation (so that we can display error messages on the UI)
  get hasNameRequiredError(): boolean {
    return !!(
      this.registerForm.get('username')?.hasError('required') &&
      (this.registerForm.get('username')?.touched ||
        this.registerForm.get('username')?.dirty)
    );
  }

  get hasEmailError(): boolean {
    return !!(
      this.registerForm.get('email')?.hasError('email') &&
      (this.registerForm.get('email')?.touched ||
        this.registerForm.get('email')?.dirty)
    );
  }

  get hasEmailRequiredError(): boolean {
    return !!(
      this.registerForm.get('email')?.hasError('required') &&
      (this.registerForm.get('email')?.touched ||
        this.registerForm.get('email')?.dirty)
    );
  }

  get hasPasswordRequiredError(): boolean {
    return !!(
      this.registerForm.get('password')?.hasError('required') &&
      (this.registerForm.get('password')?.touched ||
        this.registerForm.get('password')?.dirty)
    );
  }

  get hasMinLengthRequiredError(): boolean {
    return !!(
      this.registerForm.get('password')?.hasError('minLength') &&
      (this.registerForm.get('password')?.touched ||
        this.registerForm.get('password')?.dirty)
    );
  }

  onRegister() {
    this.authService.register(this.registerForm.value as Register).subscribe();
  }
}
