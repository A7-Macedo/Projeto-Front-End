import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../app/core/services/carrinho';
import { RoupasService } from '../../../app/core/services/roupas.service';
import { CategoriesService } from '../../../app/core/services/categories.service';
import { ToastService } from '../../../app/core/services/toast.service';

export interface ProdutoView {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  precoOriginal: number;
  desconto: string;
  imagem: string;
  avaliacao: number;
  totalAvaliacoes: number;
  badge?: string;
}

@Component({
  selector: 'app-paginaproduto-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './paginaproduto-component.html',
  styleUrl: './paginaproduto-component.css',
})
export class PaginaprodutoComponent implements OnInit {

  produto = signal<ProdutoView | undefined>(undefined);
  carregando = signal(true);
  erro = signal<string | null>(null);

  tamanhoSelecionado = signal('M');

  private categorias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private roupasService: RoupasService,
    private categoriesService: CategoriesService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.categoriesService.get().subscribe({
      next: (res) => {
        this.categorias = res.data ?? [];
      },
      error: () => {
        this.categorias = [];
      },
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.carregarProduto(id);
      }
    });
  }

  private carregarProduto(id: string): void {
    this.carregando.set(true);
    this.erro.set(null);
    this.produto.set(undefined);

    this.roupasService.getById(id).subscribe({
      next: (res) => {
        const roupa = res.data ?? res;
        this.produto.set(this.mapearProduto(roupa));
        this.carregando.set(false);
      },
      error: (err) => {
        this.erro.set(err.error?.error ?? 'Produto não encontrado.');
        this.carregando.set(false);
      },
    });
  }

  private mapearProduto(roupa: any): ProdutoView {
    const categoria = this.categorias.find(c => c.id === roupa.categoryId);
    const preco = Number(roupa.price);

    return {
      id: roupa.id,
      nome: roupa.name,
      categoria: categoria?.name ?? 'Sem categoria',
      descricao: roupa.description,
      preco,
      precoOriginal: preco,
      desconto: '',
      imagem: roupa.image_url,
      avaliacao: 5,
      totalAvaliacoes: 0,
      badge: '',
    };
  }

  selecionarTamanho(tamanho: string): void {
    this.tamanhoSelecionado.set(tamanho);
  }

  private adicionarItemAoCarrinho(): ProdutoView | null {
    const p = this.produto();
    if (!p) return null;

    this.carrinhoService.adicionar({
      id: p.id,
      nome: p.nome,
      variante: `Tamanho ${this.tamanhoSelecionado()} · Preto`,
      unit: p.preco,
      original: p.precoOriginal,
      imagem: p.imagem,
    });

    return p;
  }

  comprarAgora(): void {
    const p = this.adicionarItemAoCarrinho();
    if (!p) return;
    this.router.navigate(['/carrinho']);
  }

  adicionarAoCarrinho(): void {
    const p = this.adicionarItemAoCarrinho();
    if (!p) return;

    this.toastService.success('Produto adicionado ao carrinho!');
  }
}