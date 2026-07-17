import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm implements OnInit {

  private categorieService = inject(CategoriesService);

  categorias = signal<any[]>([]);

  categorieForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  categoriaEditando: any = null;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.get().subscribe({
      next: (res) => {
        this.categorias.set(res.data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit(): void {

    if (this.categorieForm.invalid) {
      this.categorieForm.markAllAsTouched();
      alert('Preencha o nome da categoria.');
      return;
    }

    const values = this.categorieForm.getRawValue();

    const formData = new FormData();

    formData.append('name', values.name ?? '');
    formData.append('description', values.description ?? '');

    // CADASTRO
    if (!this.categoriaEditando) {

      this.categorieService.post(formData).subscribe({
        next: () => {
          alert('Categoria cadastrada com sucesso!');

          this.categorieForm.reset({
            name: '',
            description: ''
          });

          this.loadCategories();
        },

        error: (err) => {
          console.error(err);

          const mensagem =
            err?.error?.message ??
            err?.error?.erro ??
            err?.error?.error ??
            'Erro ao cadastrar categoria.';

          alert(mensagem);
        }
      });

      return;
    }

    // EDIÇÃO
    this.categorieService.put(this.categoriaEditando.id, formData).subscribe({
      next: () => {

        alert('Categoria atualizada com sucesso!');

        this.categorieForm.reset({
          name: '',
          description: ''
        });

        this.categoriaEditando = null;

        this.loadCategories();
      },

      error: (err) => {
        console.error(err);

        alert(
          err?.error?.message ??
          err?.error?.erro ??
          err?.error?.error ??
          'Erro ao atualizar categoria.'
        );
      }
    });

  }

  editCategory(categoria: any) {

    this.categoriaEditando = categoria;

    this.categorieForm.patchValue({
      name: categoria.name,
      description: categoria.description
    });

  }

  deleteCategory(categoria: any) {

    if (!confirm(`Deseja excluir "${categoria.name}"?`)) {
      return;
    }

    this.categorieService.delete(categoria.id).subscribe({
      next: () => {
        alert('Categoria excluída com sucesso!');
        this.loadCategories();
      },

      error: (err) => {
        console.error(err);

        alert(
          err?.error?.message ??
          err?.error?.erro ??
          err?.error?.error ??
          'Erro ao excluir categoria.'
        );
      }
    });

  }

}