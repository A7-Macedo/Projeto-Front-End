import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  enviando = signal(false)

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  onSubmit(): void {
    this.enviando.set(true)
    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email!, password!).subscribe({
      next: () => {
        alert("Login realizado com sucesso!");
        this.router.navigate(['/admin/dashboard']);
        this.enviando.set(false)
      },
      error: (err) => {
        alert(err.error.error);
        this.enviando.set(false)
      }
    });
  }
}