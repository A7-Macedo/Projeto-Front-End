import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoupasService } from '../../core/services/roupas.service';

@Component({
  selector: 'app-roupas-form',
  imports: [ReactiveFormsModule],
  templateUrl: './roupas-form.component.html',
  styleUrl: './roupas-form.component.css',
})
export class RoupasFormComponent {

  roupasService = inject(RoupasService);
  imagemSelecionada: File | null = null;

  roupasForm = new FormGroup({
    titulo: new FormControl("", [Validators.required]),
    descricao: new FormControl("", [Validators.required]),
    categoria: new FormControl("", [Validators.required]),
    tempo_leitura: new FormControl("", [Validators.required]),
    data_publicacao: new FormControl("", [Validators.required]),
  });

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imagemSelecionada = input?.files?.[0] ?? null;
  }

  onSubmit(): void {
    const formData = new FormData();
    const values = this.roupasForm.value;

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (this.imagemSelecionada) {
      formData.append("imagem", this.imagemSelecionada);
    }

    this.roupasService.cadastro(formData).subscribe({
      next: () => {
        alert("Publicado com sucesso!");
      }
    });
  }
}