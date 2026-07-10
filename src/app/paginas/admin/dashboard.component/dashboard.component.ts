import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RoupasService } from '../../../core/services/roupas.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  roupasService = inject(RoupasService);
  private router = inject(Router);

  roupas = signal<any[]>([])
  isLoading = signal(false)
  isDeleting = signal(false)

  // Termo de busca digitado pelo usuário
  searchTerm = signal<string>('')

  // Lista filtrada: se o campo de busca estiver vazio, mostra tudo
  roupasFiltradas = computed(() => {
    const termo = this.searchTerm().trim()

    if (!termo) {
      return this.roupas()
    }

    return this.roupas().filter(item => 
      String(item.id) === termo
    )
  })

  ngOnInit(): void {
    this.loadRoupas()
  }

  loadRoupas() {
    this.isLoading.set(true)
    this.roupasService.getAll().subscribe({
      next: (res) => {
        console.log(res)
        this.roupas.set(res.data)
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error(err)
        this.isLoading.set(false)
      }
    })
  }

  onSearchChange(event: Event): void {
    const valor = (event.target as HTMLInputElement).value
    this.searchTerm.set(valor)
  }

  limparBusca(): void {
    this.searchTerm.set('')
  }

  abrirModalRoupa(): void {
    this.roupasService.abrirModal();
  }

  editarRoupa(id: any): void {
    this.router.navigate(['/admin/roupas/edit'], { queryParams: { id } });
  }

  deletarRoupas(id: any) {
    this.isDeleting.set(true)
    this.roupasService.deleta(id).subscribe({
      next: () => {
        alert("Item deletado com sucesso. id: " + id)
        this.isDeleting.set(false)
        this.loadRoupas()
      },
      error: (err) => {
        alert(err.error.error);
        this.isDeleting.set(false)
      }
    })
  }
}