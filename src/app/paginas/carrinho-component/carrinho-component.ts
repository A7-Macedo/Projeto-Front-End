import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarrinhoService, ItemCarrinho } from '../../../app/core/services/carrinho'; // mesmo caminho usado no produto

@Component({
  selector: 'app-carrinho-component',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './carrinho-component.html',
  styleUrl: './carrinho-component.css',
})
export class CarrinhoComponent {

  readonly FRETE_LIMITE = 199;

  constructor(private carrinhoService: CarrinhoService) {}

  // sempre lê a lista atual do service, em vez de guardar cópia local
  get itens(): ItemCarrinho[] {
    return this.carrinhoService.getItens();
  }

  // ===== Ações =====

  incrementar(item: ItemCarrinho): void {
    this.carrinhoService.incrementar(item);
  }

  decrementar(item: ItemCarrinho): void {
    this.carrinhoService.decrementar(item);
  }

  remover(item: ItemCarrinho): void {
    this.carrinhoService.remover(item.id, item.variante);
  }

  esvaziarCarrinho(): void {
    this.carrinhoService.limpar();
  }

  toggleItem(item: ItemCarrinho): void {
    this.carrinhoService.toggleItem(item);
  }

  toggleTudo(marcado: boolean): void {
    this.carrinhoService.toggleTudo(marcado);
  }

  get todosMarcados(): boolean {
    return this.itens.length > 0 && this.itens.every(i => i.marcado);
  }

  trackById(index: number, item: ItemCarrinho): number {
    return item.id;
  }

  // ===== Cálculos (resumo) =====

  private get itensSelecionados(): ItemCarrinho[] {
    return this.itens.filter(i => i.marcado);
  }

  get subtotalOriginal(): number {
    return this.itensSelecionados.reduce((soma, i) => soma + i.original * i.qtd, 0);
  }

  get subtotalUnit(): number {
    return this.itensSelecionados.reduce((soma, i) => soma + i.unit * i.qtd, 0);
  }

  get desconto(): number {
    return this.subtotalOriginal - this.subtotalUnit;
  }

  get freteGratis(): boolean {
    return this.subtotalUnit >= this.FRETE_LIMITE;
  }

  get faltaParaFrete(): number {
    return Math.max(0, this.FRETE_LIMITE - this.subtotalUnit);
  }

  get progressoFrete(): number {
    return Math.min(100, (this.subtotalUnit / this.FRETE_LIMITE) * 100);
  }

  get cashback(): number {
    return this.subtotalUnit * 0.05;
  }

  get total(): number {
    return this.subtotalUnit;
  }

  // ===== Contador de peças =====

  get totalUnidades(): number {
    return this.itens.reduce((soma, i) => soma + i.qtd, 0);
  }

  finalizarCompra(): void {
    alert('Pedido finalizado!');
  }
}