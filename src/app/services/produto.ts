// src/app/services/produto.ts
export interface Produto {
  id: number;
  slot: number;
  titulo: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  precoOriginal: number;
  desconto: string;
  imagem: string;
  avaliacao: number;
  totalAvaliacoes: number;
  badge: string;
}