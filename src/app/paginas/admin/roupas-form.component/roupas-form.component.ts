import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoupasService } from '../../../core/services/roupas.service';
import { CategoriesService } from '../../../core/services/categories.service';
import { signalGetFn } from '@angular/core/primitives/signals';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roupas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roupas-form.component.html',
  styleUrl: './roupas-form.component.css',
})

// ====================================================================

export class RoupasFormComponent implements OnInit {

  roupasService = inject(RoupasService);
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  private categoriesService = inject(CategoriesService)

  imagemSelecionada: File | null = null;
  id: any;
  categories = signal<any[]>([]);

  roupasForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.roupasService.getById(this.id).subscribe({
        next: (res) => {
          this.roupasForm.patchValue({
            name: res.name,
            description: res.description,
            price: res.price,
            categoryId: res.categoryId,
          })
        }
      })
    }

    this.getCategories();
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

    if (this.imagemSelecionada) {
      formData.append('image', this.imagemSelecionada);
    }

    if (this.id) {
      this.roupasService.atualiza(formData, this.id).subscribe({
        next: () => {
          alert("Atualizado com sucesso!")
          this.router.navigate(['/admin/dashboard'])
        },
        error: (err) => {
          alert(err.error.error)
        }
      })
    } else {
      this.roupasService.cadastro(formData).subscribe({
        next: () => {
          alert("Publicado com sucesso!");
          this.router.navigate(['/admin/dashboard'])
        },
        error: (err) => {
          alert(err.error.error)
        }
      })
    }
  }
  // ==================================================================== 

  getCategories() {
    this.categoriesService.get().subscribe((res) => {
      console.log(res)
      this.categories.set(res.data)
    })
  }
}