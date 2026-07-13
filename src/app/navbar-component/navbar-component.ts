import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { CarrinhoService } from '../../app/core/services/carrinho'; // ajuste o caminho conforme sua pasta real

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  authService = inject(AuthService);
  carrinhoService = inject(CarrinhoService);

  // exposto pra usar com "async" no template, sem precisar de subscribe/OnDestroy manual
  totalItens$ = this.carrinhoService.totalItens$;
}