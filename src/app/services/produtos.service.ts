import {Injectable } from '@angular/core';

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
  badge?: string;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
private produtos: Produto[] = [
    // Camisas (desconto 22%)
    {
      id: 1,
      slot: 1,
      titulo: 'Midnight Summit',
      nome: 'Midnight Summit',
      categoria: 'camisas',
      descricao: 'Midnight Summit combina elegância e personalidade.',
      preco: 69.90,
      precoOriginal: 89.90,
      desconto: '22%',
      imagem: '/camisa.1.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 2,
      slot: 2,
      titulo: 'Signature Sand Élégance',
      nome: 'Signature Sand Élégance',
      categoria: 'camisas',
      descricao: 'A Signature Woodland traduz a serenidade da natureza em um visual contemporâneo.',
      preco: 69.90,
      precoOriginal: 89.90,
      desconto: '22%',
      imagem: '/camisa.2.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 3,
      slot: 3,
      titulo: 'Ivory Prestige',
      nome: 'Ivory Prestige',
      categoria: 'camisas',
      descricao: 'Ivory Prestige foi criada para quem acredita que a verdadeira elegância está nos detalhes.',
      preco: 69.90,
      precoOriginal: 89.90,
      desconto: '22%',
      imagem: '/camisa.3.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 4,
      slot: 4,
      titulo: 'Midnight Eclipse',
      nome: 'Midnight Eclipse',
      categoria: 'camisas',
      descricao: 'Midnight Eclipse une modernidade e requinte.',
      preco: 69.90,
      precoOriginal: 89.90,
      desconto: '22%',
      imagem: '/camisa.4.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },

    // Calças (desconto 18%)
    {
      id: 6,
      slot: 1,
      titulo: 'Imperial Cocoa',
      nome: 'Imperial Cocoa',
      categoria: 'calcas',
      descricao: 'Imperial Cocoa entrega conforto e caimento impecável em um tom sóbrio e refinado.',
      preco: 89.90,
      precoOriginal: 109.90,
      desconto: '18%',
      imagem: '/calças.1.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 8,
      slot: 3,
      titulo: 'Golden Dune',
      nome: 'Golden Dune',
      categoria: 'calcas',
      descricao: 'Golden Dune apresenta um visual elegante com inspiração nas dunas douradas.',
      preco: 89.90,
      precoOriginal: 109.90,
      desconto: '18%',
      imagem: '/calças.3.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 9,
      slot: 4,
      titulo: 'Executive Noir',
      nome: 'Executive Noir',
      categoria: 'calcas',
      descricao: 'Clássica e sofisticada, a Executive Noir foi desenvolvida para quem busca elegância em todos os momentos.',
      preco: 89.90,
      precoOriginal: 109.90,
      desconto: '18%',
      imagem: '/calças.4.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 10,
      slot: 5,
      titulo: 'Ivory Heritage',
      nome: 'Ivory Heritage',
      categoria: 'calcas',
      descricao: 'Ivory Heritage une tradição e modernidade em uma peça de acabamento impecável.',
      preco: 89.90,
      precoOriginal: 109.90,
      desconto: '18%',
      imagem: '/calças.5.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },

    // Jaquetas (desconto 11%)
    {
      id: 11,
      slot: 1,
      titulo: 'Urban Legacy',
      nome: 'Urban Legacy',
      categoria: 'jaquetas',
      descricao: 'Urban Legacy combina proteção, conforto e um design minimalista, ideal para acompanhar a rotina com elegância.',
      preco: 169.90,
      precoOriginal: 189.90,
      desconto: '11%',
      imagem: '/jaqueta.1.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 13,
      slot: 3,
      titulo: 'Alpine Ivory',
      nome: 'Alpine Ivory',
      categoria: 'jaquetas',
      descricao: 'Alpine Ivory traz inspiração nas paisagens alpinas para compor looks elegantes em qualquer clima.',
      preco: 169.90,
      precoOriginal: 189.90,
      desconto: '11%',
      imagem: '/jaqueta.3.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 14,
      slot: 4,
      titulo: 'Silver Horizon',
      nome: 'Silver Horizon',
      categoria: 'jaquetas',
      descricao: 'Silver Horizon foi criada para quem aprecia um estilo urbano e refinado.',
      preco: 169.90,
      precoOriginal: 189.90,
      desconto: '11%',
      imagem: '/jaqueta.4.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 15,
      slot: 5,
      titulo: 'Pure Essence',
      nome: 'Pure Essence',
      categoria: 'jaquetas',
      descricao: 'Pure Essence representa a simplicidade elevada ao máximo nível de elegância.',
      preco: 169.90,
      precoOriginal: 189.90,
      desconto: '11%',
      imagem: '/jaqueta.5.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },

    // Casacos (desconto 12%)
    {
      id: 16,
      slot: 1,
      titulo: 'Vintage Oak',
      nome: 'Vintage Oak',
      categoria: 'casacos',
      descricao: 'Vintage Oak combina tradição, conforto e sofisticação em uma única peça.',
      preco: 149.90,
      precoOriginal: 169.90,
      desconto: '12%',
      imagem: '/casaco.1.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 17,
      slot: 2,
      titulo: 'Graphite Elite',
      nome: 'Graphite Elite',
      categoria: 'casacos',
      descricao: 'Graphite Elite apresenta linhas modernas e acabamento premium, oferecendo um visual marcante para quem valoriza exclusividade.',
      preco: 149.90,
      precoOriginal: 169.90,
      desconto: '12%',
      imagem: '/casaco.2.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 18,
      slot: 3,
      titulo: 'Royal Coast',
      nome: 'Royal Coast',
      categoria: 'casacos',
      descricao: 'Royal Coast une o estilo clássico ao espírito contemporâneo.',
      preco: 149.90,
      precoOriginal: 169.90,
      desconto: '12%',
      imagem: '/casaco.3.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 19,
      slot: 4,
      titulo: 'Sand Heritage',
      nome: 'Sand Heritage',
      categoria: 'casacos',
      descricao: 'Sand Heritage traduz a beleza dos tons naturais em uma peça sofisticada, pensada para quem busca autenticidade e requinte.',
      preco: 149.90,
      precoOriginal: 169.90,
      desconto: '12%',
      imagem: '/casaco.4.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },

    // Sapatos (desconto 6%)
    {
      id: 21,
      slot: 1,
      titulo: 'White Signature',
      nome: 'White Signature',
      categoria: 'sapatos',
      descricao: 'White Signature combina design minimalista, conforto e acabamento premium.',
      preco: 299.90,
      precoOriginal: 319.90,
      desconto: '6%',
      imagem: '/sapato.1.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 23,
      slot: 3,
      titulo: 'Desert Classic',
      nome: 'Desert Classic',
      categoria: 'sapatos',
      descricao: 'Desert Classic une sofisticação e versatilidade em um modelo atemporal.',
      preco: 299.90,
      precoOriginal: 319.90,
      desconto: '6%',
      imagem: '/sapato.3.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 24,
      slot: 4,
      titulo: 'Urban Steel',
      nome: 'Urban Steel',
      categoria: 'sapatos',
      descricao: 'Urban Steel apresenta um design contemporâneo com acabamento refinado, perfeito para quem valoriza exclusividade e conforto.',
      preco: 299.90,
      precoOriginal: 319.90,
      desconto: '6%',
      imagem: '/sapato.4.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 25,
      slot: 5,
      titulo: 'Dual Prestige',
      nome: 'Dual Prestige',
      categoria: 'sapatos',
      descricao: 'Dual Prestige um modelo elegante e versátil, desenvolvido para destacar qualquer produção.',
      preco: 299.90,
      precoOriginal: 319.90,
      desconto: '6%',
      imagem: '/sapato.5.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },

    // Tênis (desconto 7%)
    {
      id: 26,
      slot: 1,
      titulo: 'Pure Comfort',
      nome: 'Pure Comfort',
      categoria: 'tenis',
      descricao: 'Pure Comfort oferece leveza, conforto e um visual minimalista para acompanhar todos os momentos com sofisticação.',
      preco: 249.90,
      precoOriginal: 269.90,
      desconto: '7%',
      imagem: '/tenis.1.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 28,
      slot: 3,
      titulo: 'Sand Comfort',
      nome: 'Sand Comfort',
      categoria: 'tenis',
      descricao: 'Sand Comfort proporciona uma experiência de conforto aliada a um visual elegante.',
      preco: 249.90,
      precoOriginal: 269.90,
      desconto: '7%',
      imagem: '/tenis.3.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 29,
      slot: 4,
      titulo: 'Steel Comfort',
      nome: 'Steel Comfort',
      categoria: 'tenis',
      descricao: 'Steel Comfort apresenta um acabamento contemporâneo e materiais selecionados para oferecer estilo e bem-estar em cada passo.',
      preco: 249.90,
      precoOriginal: 269.90,
      desconto: '7%',
      imagem: '/tenis.4.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
    {
      id: 30,
      slot: 5,
      titulo: 'Contrast Comfort',
      nome: 'Contrast Comfort',
      categoria: 'tenis',
      descricao: 'Contrast Comfort destaca-se pelo design bicolor sofisticado, entregando conforto, versatilidade e um toque exclusivo para o dia a dia.',
      preco: 249.90,
      precoOriginal: 269.90,
      desconto: '7%',
      imagem: '/tenis.5.png',
      avaliacao: 4.5,
      totalAvaliacoes: 0,
      badge: ''
    },
  ];

  listar(): Produto[] {
    return this.produtos;
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  atualizar(produto: Produto): void {
    const index = this.produtos.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      this.produtos[index] = { ...produto };
    }
  }
}