export interface Produto {
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