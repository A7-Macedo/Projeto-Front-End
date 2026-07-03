import { Injectable } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  variante: string;
  unit: number;
  original: number;
  qtd: number;
  marcado: boolean;
  imagem: string;
}

const CHAVE_STORAGE = 'meu-carrinho';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private itens: ItemCarrinho[] = [];

  constructor() {
    this.itens = this.carregar();
  }

  private carregar(): ItemCarrinho[] {
    try {
      const dados = localStorage.getItem(CHAVE_STORAGE);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  private salvar(): void {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(this.itens));
  }

  getItens(): ItemCarrinho[] {
    return this.itens;
  }

  adicionar(item: Omit<ItemCarrinho, 'qtd' | 'marcado'>, qtd: number = 1): void {

    // compara id + variante, pra "Camiseta P" e "Camiseta M" não virarem a mesma linha
    const existente = this.itens.find(
      i => i.id === item.id && i.variante === item.variante
    );

    if (existente) {
      existente.qtd += qtd;
    } else {
      this.itens.push({ ...item, qtd, marcado: true });
    }

    this.salvar();
  }

  incrementar(item: ItemCarrinho): void {
    const alvo = this.itens.find(i => i.id === item.id && i.variante === item.variante);
    if (alvo) alvo.qtd++;
    this.salvar();
  }

  decrementar(item: ItemCarrinho): void {
    const alvo = this.itens.find(i => i.id === item.id && i.variante === item.variante);
    if (alvo && alvo.qtd > 1) alvo.qtd--;
    this.salvar();
  }

  remover(id: number): void {
    this.itens = this.itens.filter(i => i.id !== id);
    this.salvar();
  }

  limpar(): void {
    this.itens = [];
    this.salvar();
  }

  toggleItem(item: ItemCarrinho): void {
    const alvo = this.itens.find(i => i.id === item.id && i.variante === item.variante);
    if (alvo) alvo.marcado = !alvo.marcado;
    this.salvar();
  }

  toggleTudo(marcado: boolean): void {
    this.itens.forEach(i => i.marcado = marcado);
    this.salvar();
  }
}