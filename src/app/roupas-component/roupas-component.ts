import { Component, Input, Output, EventEmitter, OnInit, OnChanges, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../app/core/services/carrinho';
import { RoupasService } from '../core/services/roupas.service';
import { CategoriesService } from '../core/services/categories.service';
import { ToastService } from '../core/services/toast.service';

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
export class RoupasComponent implements OnInit, OnChanges {

  @Input() filtro: string = 'todos';
  @Input() busca: string = '';

  // Limite fixo (mostra sempre só essa quantidade, sem botão "ver mais")
  @Input() limite: number | null = null;

  // Ativa o modo paginado: mostra uma quantidade inicial por categoria.
  // O "ver mais" agora não expande a lista, ele redireciona/filtra pela categoria.
  @Input() paginado: boolean = false;
  @Input() qtdInicial: number = 4;

  // Emite o nome da categoria quando o usuário clica em "Ver mais",
  // pra quem estiver usando o componente (ex: InicioComponent) trocar o filtro ativo.
  @Output() verCategoria = new EventEmitter<string>();

  private carrinhoService = inject(CarrinhoService);
  private roupasService = inject(RoupasService);
  private categoriesService = inject(CategoriesService);
  private toastService = inject(ToastService);

  produtos = signal<Produto[]>([]);
  private categoriasMap = new Map<number, string>();

  readonly categorias = [
    'camisas',
    'calcas',
    'jaquetas',
    'casacos',
    'sapatos',
    'tenis'
  ];

  private readonly slotClassMap: Record<string, string> = {
    camisas: 'camisa',
    calcas: 'calca',
    jaquetas: 'jaqueta',
    casacos: 'casaco',
    sapatos: 'sapato',
    tenis: 'tenis',
  };

  slotClass(categoria: string): string {
    return this.slotClassMap[categoria] ?? categoria;
  }

  ngOnInit(): void {
    this.categoriesService.get().subscribe({
      next: (resCat) => {

        (resCat.data ?? []).forEach((cat: any) => {
          this.categoriasMap.set(cat.id, this.normalizarCategoria(cat.name));
        });

        this.carregarProdutos();

      },
      error: () => {
        this.carregarProdutos();
      }
    });
  }

  ngOnChanges(): void {
    // sem lista expandida pra resetar, já que "ver mais" não incrementa mais nada.
  }

  private carregarProdutos(): void {

    this.roupasService.getAll().subscribe({

      next: (res) => {

        const contadorPorCategoria = new Map<string, number>();

        let lista = (res.data ?? []).map((item: any) => {

          const categoria = this.categoriasMap.get(item.categoryId) ?? 'outros';

          const slotAtual = (contadorPorCategoria.get(categoria) ?? 0) + 1;

          contadorPorCategoria.set(categoria, slotAtual);

          return {
            id: item.id,
            categoria,
            slot: slotAtual,
            titulo: item.name,
            descricao: item.description,
            preco: Number(item.price),
            imagem: item.image_url,
          } as Produto;

        });

        this.produtos.set(lista);

      },

      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }

    });

  }

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
    if (!this.busca || this.busca.trim() === '') {
      return true;
    }

    return this.normalizarCategoria(titulo)
      .includes(this.normalizarCategoria(this.busca));
  }

  produtosPorCategoria(categoria: string): Produto[] {
    return this.produtos().filter(p => p.categoria === categoria);
  }

  // Todos os produtos da categoria já filtrados pela busca (sem cortar pelo limite)
  private produtosCategoriaFiltradosCompletos(categoria: string): Produto[] {
    return this.produtosPorCategoria(categoria)
      .filter(p => this.filtroBusca(p.titulo));
  }

  produtosPorCategoriaFiltrado(categoria: string): Produto[] {

    let lista = this.produtosCategoriaFiltradosCompletos(categoria);

    // Se o usuário já está "dentro" dessa categoria (filtro === categoria, ex: clicou em
    // "Ver mais" ou no botão de filtro), mostra a lista completa, sem cortar em qtdInicial.
    // Isso corrige o problema de roupas recém-cadastradas não aparecerem: antes o corte
    // acontecia mesmo depois de entrar na categoria.
    const verTudoDestaCategoria = this.filtro === categoria;

    if (verTudoDestaCategoria) {
      return lista;
    }

    if (this.paginado) {
      lista = lista.slice(0, this.qtdInicial);
    } else if (this.limite !== null) {
      lista = lista.slice(0, this.limite);
    }

    return lista;
  }

  // "Ver mais" sempre aparece (exceto quando o usuário já está dentro dessa categoria específica)
  temMaisProdutos(categoria: string): boolean {
    if (!this.paginado) return false;
    if (this.filtro === categoria) return false;
    return true;
  }

  // Ao clicar em "Ver mais", não expande a lista: emite a categoria pra quem
  // estiver usando o componente decidir o que fazer (ex: trocar o filtro ativo)
  irParaCategoria(categoria: string): void {
    this.verCategoria.emit(categoria);
  }

  nenhumProdutoEncontrado(): boolean {
    return this.categorias.every(
      (cat) => !this.mostrar(cat) || this.produtosPorCategoriaFiltrado(cat).length === 0
    );
  }

  adicionarAoCarrinho(
    id: number,
    titulo: string,
    preco: number,
    imagem: string
  ): void {

    this.carrinhoService.adicionar({
      id,
      nome: titulo,
      variante: 'Único',
      unit: preco,
      original: preco,
      imagem,
    });

    this.toastService.success('Produto adicionado ao carrinho!');
  }

}