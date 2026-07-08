import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoupasService } from '../../core/services/roupas.service';
import { CategoriesService } from '../../core/services/categories.service';
import { signalGetFn } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-roupas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roupas-form.component.html',
  styleUrl: './roupas-form.component.css',
})
export class RoupasFormComponent implements OnInit {

  private roupasService = inject(RoupasService);
  private categoriesService = inject(CategoriesService)

  imagemSelecionada: File | null = null;

  categories = signal<any[]>([])

  roupasForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
    // size: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getCategories()
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];
    }
  }

  onSubmit(): void {

    if (this.roupasForm.invalid) {
      this.roupasForm.markAllAsTouched();
      alert('Preencha todos os campos.');
      return;
    }

    const values = this.roupasForm.getRawValue();

    const formData = new FormData();

    formData.append('name', values.name ?? '');
    formData.append('description', values.description ?? '');
    formData.append('price', String(values.price));
    formData.append('categoryId', String(values.categoryId));
    // formData.append('size', values.size ?? '');

    if (this.imagemSelecionada) {
      formData.append('image', this.imagemSelecionada);
    }

    this.roupasService.cadastro(formData).subscribe({
      next: (res) => {
        console.log('Sucesso:', res);

        alert('Roupa cadastrada com sucesso!');

        this.roupasForm.reset({
          name: '',
          description: '',
          price: null,
          categoryId: null,

        });

        this.imagemSelecionada = null;
      },

      error: (err) => {
        console.error(err);

        const mensagem =
          err?.error?.message ??
          err?.error?.erro ??
          'Erro ao cadastrar a roupa.';

        alert(mensagem);
      }
    });
  }

  getCategories() {
    this.categoriesService.get().subscribe((res) => {
      console.log(res)
      this.categories.set(res.data)
    })
  }
}