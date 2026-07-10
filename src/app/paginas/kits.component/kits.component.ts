import { Component } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-kits.component',
  imports: [RouterLink],
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