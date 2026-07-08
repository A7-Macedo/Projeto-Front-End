import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-esqueceusenha',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './esqueceusenha.component.html',
  styleUrl: './esqueceusenha.component.css',
})
export class EsqueceuSenhaComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  esqueceuSenhaForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  onSubmit(): void {
    if (this.esqueceuSenhaForm.invalid) {
      this.esqueceuSenhaForm.markAllAsTouched();
      return;
    }

    const email = this.esqueceuSenhaForm.getRawValue().email;
    if (!email) return;

    this.authService.esqueceuSenha(email).subscribe({
      next: () => {
        alert('Link de recuperação enviado! Confira seu e-mail.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.error ?? 'Erro ao enviar link de recuperação.');
      },
    });
  }
}