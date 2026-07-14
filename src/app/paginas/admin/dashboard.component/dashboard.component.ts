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

  searchTerm = signal<string>('')

  // categoria atualmente selecionada no filtro ('todas' = sem filtro)
  categoriaSelecionada = signal<string>('todas')

  // extrai as categorias únicas a partir das roupas carregadas
  categorias = computed(() => {
    const todasCategorias = this.roupas().map(item => item.categoryId)
    return Array.from(new Set(todasCategorias))
  })

  // aplica busca por ID + filtro de categoria juntos
  roupasFiltradas = computed(() => {
    const termo = this.searchTerm().trim()
    const categoria = this.categoriaSelecionada()

    let resultado = this.roupas()

    if (categoria !== 'todas') {
      resultado = resultado.filter(item => item.categoryId === categoria)
    }

    if (termo) {
      resultado = resultado.filter(item => String(item.id) === termo)
    }

    return resultado
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

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada.set(categoria)
  }

  abrirModalRoupa(): void {
    this.roupasService.abrirModal();
  }

  // ✅ CORRIGIDO: rota agora bate com app.routes.ts ('/admin/editar')
  editarRoupa(id: any): void {
    this.router.navigate(['/admin/editar'], { queryParams: { id } });
  }

  deletarRoupas(id: any) {
    if (!id) {
      console.error('ID inválido para deleção:', id);
      return;
    }

    const confirmar = confirm(`Tem certeza que deseja deletar o produto ID ${id}?`);
    if (!confirmar) return;

    this.isDeleting.set(true)
    this.roupasService.deleta(id).subscribe({
      next: () => {
        alert("Item deletado com sucesso. id: " + id)
        this.isDeleting.set(false)
        this.loadRoupas()
      },
      error: (err) => {
        console.error('Erro ao deletar:', err); // ✅ log completo do erro no console
        const mensagem = err?.error?.error || err?.message || 'Erro desconhecido ao deletar';
        alert(mensagem);
        this.isDeleting.set(false)
      }
    })
  }
}