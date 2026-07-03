import { Component, signal } from '@angular/core';
import { RoupasComponent } from '../../roupas-component/roupas-component';

@Component({
  selector: 'app-inicio-component',
  imports: [RoupasComponent],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent {
  filtroAtivo = signal('todos');

  selecionarFiltro(categoria: string): void {
    this.filtroAtivo.set(categoria);
  }
}