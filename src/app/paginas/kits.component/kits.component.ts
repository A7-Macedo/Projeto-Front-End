import { Component } from '@angular/core';
import { CarrinhoService } from '../../../app/core/services/carrinho';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@Component({
  selector: 'app-kits.component',
  imports: [CarouselModule],
  templateUrl: './kits.component.html',
  styleUrl: './kits.component.css',
})
export class KitsComponent {

  constructor(private carrinhoService: CarrinhoService) {}

  adicionarAoCarrinho(id: number, nome: string, preco: number, imagem: string): void {
    this.carrinhoService.adicionar({
      id,
      nome,
      variante: 'Único',
      unit: preco,
      original: preco,
      imagem,
    });
  }
  
}