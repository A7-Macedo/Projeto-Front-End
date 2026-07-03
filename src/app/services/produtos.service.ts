import { Injectable } from '@angular/core';
import { Produto } from './produto';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private produtos: Produto[] = [
    // Camisetas
    { id: 1, nome: 'Midnight Summit', categoria: 'Camisetas', descricao: 'Midnight Summit combina elegância e personalidade.', preco: 69.90, precoOriginal: 69.90, desconto: '', imagem: '/camisa.1.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: 'Novo' },
    { id: 2, nome: 'Signature Sand Élégance', categoria: 'Camisetas', descricao: 'A Signature Woodland traduz a serenidade da natureza em um visual contemporâneo.', preco: 69.90, precoOriginal: 69.90, desconto: '', imagem: '/camisa.2.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 3, nome: 'Ivory Prestige', categoria: 'Camisetas', descricao: 'Ivory Prestige foi criada para quem acredita que a verdadeira elegância está nos detalhes.', preco: 69.90, precoOriginal: 69.90, desconto: '', imagem: '/camisa.3.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 4, nome: 'Midnight Eclipse', categoria: 'Camisetas', descricao: 'Midnight Eclipse une modernidade e requinte.', preco: 69.90, precoOriginal: 69.90, desconto: '', imagem: '/camisa.4.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 5, nome: 'Royal Noir', categoria: 'Camisetas', descricao: 'Royal Noir representa o clássico reinventado.', preco: 69.90, precoOriginal: 69.90, desconto: '', imagem: '/camisa.5.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },

    // Calças
    { id: 6, nome: 'Imperial Cocoa', categoria: 'Calças', descricao: 'Imperial Cocoa entrega conforto e caimento impecável em um tom sóbrio e refinado.', preco: 89.90, precoOriginal: 89.90, desconto: '', imagem: '/calças.1.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 7, nome: 'Desert Prestige', categoria: 'Calças', descricao: 'Desert Prestige combina leveza, sofisticação e versatilidade em um design contemporâneo.', preco: 89.90, precoOriginal: 89.90, desconto: '', imagem: '/calças.2.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 8, nome: 'Golden Dune', categoria: 'Calças', descricao: 'Golden Dune apresenta um visual elegante com inspiração nas dunas douradas.', preco: 89.90, precoOriginal: 89.90, desconto: '', imagem: '/calças.3.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 9, nome: 'Executive Noir', categoria: 'Calças', descricao: 'Clássica e sofisticada, a Executive Noir foi desenvolvida para quem busca elegância em todos os momentos.', preco: 89.90, precoOriginal: 89.90, desconto: '', imagem: '/calças.4.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 10, nome: 'Ivory Heritage', categoria: 'Calças', descricao: 'Ivory Heritage une tradição e modernidade em uma peça de acabamento impecável.', preco: 89.90, precoOriginal: 89.90, desconto: '', imagem: '/calças.5.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },

    // Jaquetas
    { id: 11, nome: 'Urban Legacy', categoria: 'Jaquetas', descricao: 'Urban Legacy combina proteção, conforto e um design minimalista, ideal para acompanhar a rotina com elegância.', preco: 169.90, precoOriginal: 169.90, desconto: '', imagem: '/jaqueta.1.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 12, nome: 'Navy Prestige', categoria: 'Jaquetas', descricao: 'Navy Prestige entrega um visual refinado sem abrir mão da funcionalidade e do conforto.', preco: 169.90, precoOriginal: 169.90, desconto: '', imagem: '/jaqueta.2.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 13, nome: 'Alpine Ivory', categoria: 'Jaquetas', descricao: 'Alpine Ivory traz inspiração nas paisagens alpinas para compor looks elegantes em qualquer clima.', preco: 169.90, precoOriginal: 169.90, desconto: '', imagem: '/jaqueta.3.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 14, nome: 'Silver Horizon', categoria: 'Jaquetas', descricao: 'Silver Horizon foi criada para quem aprecia um estilo urbano e refinado.', preco: 169.90, precoOriginal: 169.90, desconto: '', imagem: '/jaqueta.4.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 15, nome: 'Pure Essence', categoria: 'Jaquetas', descricao: 'Pure Essence representa a simplicidade elevada ao máximo nível de elegância.', preco: 169.90, precoOriginal: 169.90, desconto: '', imagem: '/jaqueta.5.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },

    // Casacos
    { id: 16, nome: 'Vintage Oak', categoria: 'Casacos', descricao: 'Vintage Oak combina tradição, conforto e sofisticação em uma única peça.', preco: 149.90, precoOriginal: 149.90, desconto: '', imagem: '/casaco.1.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 17, nome: 'Graphite Elite', categoria: 'Casacos', descricao: 'Graphite Elite apresenta linhas modernas e acabamento premium, oferecendo um visual marcante para quem valoriza exclusividade.', preco: 149.90, precoOriginal: 149.90, desconto: '', imagem: '/casaco.2.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 18, nome: 'Royal Coast', categoria: 'Casacos', descricao: 'Royal Coast une o estilo clássico ao espírito contemporâneo.', preco: 149.90, precoOriginal: 149.90, desconto: '', imagem: '/casaco.3.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 19, nome: 'Sand Heritage', categoria: 'Casacos', descricao: 'Sand Heritage traduz a beleza dos tons naturais em uma peça sofisticada, pensada para quem busca autenticidade e requinte.', preco: 149.90, precoOriginal: 149.90, desconto: '', imagem: '/casaco.4.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 20, nome: 'Olive Legacy', categoria: 'Casacos', descricao: 'Olive Legacy entrega personalidade e conforto em cada detalhe.', preco: 149.90, precoOriginal: 149.90, desconto: '', imagem: '/casaco.5.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },

    // Sapatos
    { id: 21, nome: 'White Signature', categoria: 'Sapatos', descricao: 'White Signature combina design minimalista, conforto e acabamento premium.', preco: 299.90, precoOriginal: 299.90, desconto: '', imagem: '/sapato.1.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 22, nome: 'Midnight Motion', categoria: 'Sapatos', descricao: 'Midnight Motion oferece visual moderno e conforto para o dia a dia.', preco: 299.90, precoOriginal: 299.90, desconto: '', imagem: '/sapato.2.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 23, nome: 'Desert Classic', categoria: 'Sapatos', descricao: 'Desert Classic une sofisticação e versatilidade em um modelo atemporal.', preco: 299.90, precoOriginal: 299.90, desconto: '', imagem: '/sapato.3.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 24, nome: 'Urban Steel', categoria: 'Sapatos', descricao: 'Urban Steel apresenta um design contemporâneo com acabamento refinado, perfeito para quem valoriza exclusividade e conforto.', preco: 299.90, precoOriginal: 299.90, desconto: '', imagem: '/sapato.4.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 25, nome: 'Dual Prestige', categoria: 'Sapatos', descricao: 'Dual Prestige, um modelo elegante e versátil, desenvolvido para destacar qualquer produção.', preco: 299.90, precoOriginal: 299.90, desconto: '', imagem: '/sapato.5.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },

    // Tênis
    { id: 26, nome: 'Pure Comfort', categoria: 'Tênis', descricao: 'Pure Comfort oferece leveza, conforto e um visual minimalista para acompanhar todos os momentos com sofisticação.', preco: 249.90, precoOriginal: 249.90, desconto: '', imagem: '/tenis.1.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 27, nome: 'Noir Comfort', categoria: 'Tênis', descricao: 'Noir Comfort une praticidade e design premium em um modelo pensado para o uso diário.', preco: 249.90, precoOriginal: 249.90, desconto: '', imagem: '/tenis.2.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 28, nome: 'Sand Comfort', categoria: 'Tênis', descricao: 'Sand Comfort proporciona uma experiência de conforto aliada a um visual elegante.', preco: 249.90, precoOriginal: 249.90, desconto: '', imagem: '/tenis.3.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 29, nome: 'Steel Comfort', categoria: 'Tênis', descricao: 'Steel Comfort apresenta um acabamento contemporâneo e materiais selecionados para oferecer estilo e bem-estar em cada passo.', preco: 249.90, precoOriginal: 249.90, desconto: '', imagem: '/tenis.4.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
    { id: 30, nome: 'Contrast Comfort', categoria: 'Tênis', descricao: 'Contrast Comfort destaca-se pelo design bicolor sofisticado, entregando conforto, versatilidade e um toque exclusivo para o dia a dia.', preco: 249.90, precoOriginal: 249.90, desconto: '', imagem: '/tenis.5.png', avaliacao: 4.8, totalAvaliacoes: 128, badge: '' },
  ];

  getPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  getTodos(): Produto[] {
    return this.produtos;
  }
}