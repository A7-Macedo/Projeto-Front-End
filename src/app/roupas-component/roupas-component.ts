import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../app/core/services/carrinho';
import { RoupasService } from '../core/services/roupas.service';
import { CategoriesService } from '../core/services/categories.service';

export interface Produto {
  id: number;
  categoria: string;
  slot: number;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
}

@Component({
  selector: 'app-roupas-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './roupas-component.html',
  styleUrl: './roupas-component.css',
})
export class RoupasComponent implements OnInit {
  @Input() filtro: string = 'todos';
  @Input() busca: string = '';

  private carrinhoService = inject(CarrinhoService);
  private roupasService = inject(RoupasService);
  private categoriesService = inject(CategoriesService);

  produtos: Produto[] = [];
  private categoriasMap = new Map<number, string>();

  mostrarToast = signal<boolean>( false);
  private toastTimer: any;


  ngOnInit(): void {
    // Primeiro busca as categorias pra saber o nome de cada categoryId
    this.categoriesService.get().subscribe({
      next: (resCat) => {
        (resCat.data ?? []).forEach((cat: any) => {
          this.categoriasMap.set(cat.id, this.normalizarCategoria(cat.name));
        });
        this.carregarProdutos();
      },
      error: () => {
        // mesmo se falhar, tenta carregar os produtos com categoria "outros"
        this.carregarProdutos();
      }
    });
  }

  private carregarProdutos(): void {
    this.roupasService.getAll().subscribe({
      next: (res) => {
        const contadorPorCategoria = new Map<string, number>();

        this.produtos = (res.data ?? []).map((item: any) => {
          const categoria = this.categoriasMap.get(item.categoryId) ?? 'outros';
          const slotAtual = (contadorPorCategoria.get(categoria) ?? 0) + 1;
          contadorPorCategoria.set(categoria, slotAtual);

          return {
            id: item.id,
            categoria,
            slot: slotAtual,
            titulo: item.name,
            descricao: item.description,
            preco: item.price,
            imagem: item.image_url,
          } as Produto;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  // Remove acentos e deixa minúsculo pra bater com os filtros (camisas, calcas, etc)
  private normalizarCategoria(nome: string): string {
    return nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  mostrar(categoria: string): boolean {
    return this.filtro === 'todos' || this.filtro === categoria;
  }

  filtroBusca(titulo: string): boolean {
    if (!this.busca || this.busca.trim() === '') return true;
    return this.normalizarCategoria(titulo).includes(this.normalizarCategoria(this.busca));
  }

  produtosPorCategoria(categoria: string): Produto[] {
    return this.produtos.filter(p => p.categoria === categoria);
  }

  adicionarAoCarrinho(id: number, titulo: string, preco: number, imagem: string): void {

    this.carrinhoService.adicionar({
      id,
      nome: titulo,
      variante: 'Único',
      unit: preco,
      original: preco,
      imagem,
    });

    this.mostrarToast.set(true);

    setTimeout(() => {
      this.mostrarToast.set(false);

    }, 1500);

    console.log(this.mostrarToast())
  }
}

