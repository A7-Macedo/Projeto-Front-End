import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-component.html',
  styleUrl: './cadastro-component.css',
})
export class CadastroComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  cadastroForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  onSubmit(): void {
    const { name, email, password } = this.cadastroForm.getRawValue();

    this.authService.cadastro(name!, email!, password!).subscribe({
      next: () => {
        alert("Cadastro realizado com sucesso! 🎉");
      },
      error: (err) => {
        alert(err.error?.erro ?? 'Erro ao cadastrar');
      }
    });
  }
}