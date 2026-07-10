import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../app/services/carrinho';
import { ProdutoService, Produto } from '../../../app/services/produtos.service';

@Component({
  selector: 'app-paginaproduto-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './paginaproduto-component.html',
  styleUrl: './paginaproduto-component.css',
})
export class PaginaprodutoComponent {

  // guarda o produto atual, carregado a partir do id da rota
  produto = signal<Produto | undefined>(undefined);

  // controla qual tamanho está selecionado (padrão: M)
  tamanhoSelecionado = signal('M');

  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private produtosService: ProdutoService,
  ) {
    // toda vez que o :id da URL mudar, busca o produto correspondente
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.produto.set(this.produtosService.buscarPorId(id));
    });
  }

  selecionarTamanho(tamanho: string): void {
    this.tamanhoSelecionado.set(tamanho);
  }

  adicionarAoCarrinho(): void {
    const p = this.produto();
    if (!p) return; // segurança: só adiciona se o produto já carregou

    this.carrinhoService.adicionar({
      id: p.id,
      nome: p.nome,
      variante: `Tamanho ${this.tamanhoSelecionado()} · Preto`,
      unit: p.preco,
      original: p.precoOriginal,
      imagem: p.imagem,
    });

    this.router.navigate(['/carrinho']);
  }
}