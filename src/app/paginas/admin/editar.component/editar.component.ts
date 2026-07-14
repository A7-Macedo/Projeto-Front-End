import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoupasService } from '../../../core/services/roupas.service';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-roupas-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class RoupasEditarComponent implements OnInit {
  roupasService = inject(RoupasService);
  private categoriesService = inject(CategoriesService);
  private route = inject(ActivatedRoute); 
  categories = signal<any[]>([]);

  // controle da busca
  buscaId = new FormControl('', Validators.required);
  roupaEncontrada = signal(false);
  buscando = signal(false);
  erroBusca = signal<string | null>(null);

  // imagem
  imagemSelecionada: File | null = null;
  imagemAtualUrl = signal<string | null>(null);

  id: any = null;

  roupasForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
  });

  constructor() {
    this.getCategories();
  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.buscaId.setValue(idParam);
        this.buscarRoupa();
      }
    });
  }

  getCategories() {
    this.categoriesService.get().subscribe((res) => {
      this.categories.set(res.data);
    });
  }

  buscarRoupa(): void {
    if (this.buscaId.invalid || !this.buscaId.value) {
      this.buscaId.markAsTouched();
      return;
    }

    this.buscando.set(true);
    this.erroBusca.set(null);
    this.roupaEncontrada.set(false);

    const idBuscado = this.buscaId.value;

    this.roupasService.getById(idBuscado).subscribe({
      next: (res) => {
        const roupa = res.data ?? res;

        this.id = roupa.id ?? idBuscado;

        this.roupasForm.patchValue({
          name: roupa.name,
          description: roupa.description,
          price: roupa.price,
          categoryId: roupa.categoryId,
        });

        this.imagemAtualUrl.set(roupa.image ?? null);
        this.imagemSelecionada = null;

        this.roupaEncontrada.set(true);
        this.buscando.set(false);
      },
      error: (err) => {
        this.buscando.set(false);
        this.roupaEncontrada.set(false);
        this.erroBusca.set(err.error?.error ?? 'Roupa não encontrada.');
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];
      this.imagemAtualUrl.set(URL.createObjectURL(this.imagemSelecionada));
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

    this.roupasService.atualiza(formData, this.id).subscribe({
      next: () => {
        alert('Atualizado com sucesso!');
      },
      error: (err) => {
        alert(err.error?.error ?? 'Erro ao atualizar.');
      },
    });
  }
}