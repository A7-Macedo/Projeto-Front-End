import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoupasService } from '../../../core/services/roupas.service';
import { CategoriesService } from '../../../core/services/categories.service';

interface ProdutoEdicao {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image_url: string;
}

@Component({
  selector: 'app-editar-roupa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarRoupaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private roupasService = inject(RoupasService);
  private categoriesService = inject(CategoriesService);

  idBusca: number | null = null;
  produtoEncontrado: ProdutoEdicao | null = null;
  mensagemErro = '';
  categories = signal<any[]>([]);

  imagemSelecionada: File | null = null;
  previewUrl: string | null = null;

  ngOnInit(): void {
    this.getCategories();
    this.route.queryParams.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        this.idBusca = Number(idParam);
        this.buscarProduto();
      }
    });
  }

  getCategories(): void {
    this.categoriesService.get().subscribe({
      next: (res) => this.categories.set(res.data),
      error: (err) => console.error('Erro ao buscar categorias:', err),
    });
  }

  buscarProduto(): void {
    this.mensagemErro = '';
    this.produtoEncontrado = null;
    this.imagemSelecionada = null;
    this.previewUrl = null;

    if (this.idBusca === null) {
      this.mensagemErro = 'Digite um ID para buscar.';
      return;
    }

    this.roupasService.getById(this.idBusca).subscribe({
      next: (res) => {
        this.produtoEncontrado = {
          id: res.id,
          name: res.name,
          description: res.description,
          price: res.price,
          categoryId: res.categoryId,
          image_url: res.image_url,
        };
      },
      error: () => {
        this.mensagemErro = `Nenhuma roupa encontrada com o ID ${this.idBusca}.`;
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];

      // libera a URL de preview anterior, se existir, pra não vazar memória
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.previewUrl = URL.createObjectURL(this.imagemSelecionada);
    }
  }

  salvarEdicao(): void {
    if (!this.produtoEncontrado) return;

    const formData = new FormData();
    formData.append('name', this.produtoEncontrado.name);
    formData.append('description', this.produtoEncontrado.description);
    formData.append('price', String(this.produtoEncontrado.price));
    formData.append('categoryId', String(this.produtoEncontrado.categoryId));

    // só anexa a imagem se o usuário trocou; senão o backend mantém a atual
    if (this.imagemSelecionada) {
      formData.append('image', this.imagemSelecionada);
    }

    this.roupasService.atualiza(formData, this.produtoEncontrado.id).subscribe({
      next: () => {
        alert('Roupa atualizada com sucesso!');
      },
      error: (err) => {
        alert(err.error?.error ?? 'Erro ao atualizar a roupa.');
      },
    });
  }

  limparBusca(): void {
    this.idBusca = null;
    this.produtoEncontrado = null;
    this.mensagemErro = '';
    this.imagemSelecionada = null;
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = null;
  }
}