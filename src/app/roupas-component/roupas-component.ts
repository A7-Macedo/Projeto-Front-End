import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../app/services/carrinho';

@Component({
  selector: 'app-roupas-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './roupas-component.html',
  styleUrl: './roupas-component.css',
})
export class RoupasComponent {
  @Input() filtro: string = 'todos';

  constructor(private carrinhoService: CarrinhoService) {}

  mostrar(categoria: string): boolean {
    return this.filtro === 'todos' || this.filtro === categoria;
  }

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