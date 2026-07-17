import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RoupasService } from '../../../core/services/roupas.service';
import { CategoriesService } from '../../../core/services/categories.service';
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
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  roupas = signal<any[]>([])
  categoriesList = signal<any[]>([]) // lista completa de categorias vinda da API
  isLoading = signal(false)
  isDeleting = signal(false)

  searchTerm = signal<string>('')

  // categoria atualmente selecionada no filtro ('todas' = sem filtro)
  categoriaSelecionada = signal<string | number>('todas')

  // mapa rápido id -> nome da categoria
  categoriesMap = computed(() => {
    const map = new Map<number, string>();
    this.categoriesList().forEach(cat => map.set(cat.id, cat.name));
    return map;
  })

  // extrai as categorias únicas (id + nome) a partir das roupas carregadas
  categorias = computed(() => {
    const idsUnicos = Array.from(new Set(this.roupas().map(item => item.categoryId)))
    const map = this.categoriesMap();
    return idsUnicos.map(id => ({
      id,
      name: map.get(id) ?? `Categoria ${id}`
    }));
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
    this.loadCategories()
    this.loadRoupas()
  }

  loadCategories() {
    this.categoriesService.get().subscribe({
      next: (res) => this.categoriesList.set(res.data),
      error: (err) => console.error(err)
    })
  }

  // usado no template do card para exibir o nome em vez do id
  getCategoryName(categoryId: number): string {
    return this.categoriesMap().get(categoryId) ?? 'Sem categoria';
  }

  loadRoupas() {
    this.isLoading.set(true)
    this.roupasService.getAll().subscribe({
      next: (res) => {
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

  selecionarCategoria(categoriaId: string | number): void {
    this.categoriaSelecionada.set(categoriaId)
  }

  abrirModalRoupa(): void {
    this.roupasService.abrirModal();
  }

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
        console.error('Erro ao deletar:', err);
        const mensagem = err?.error?.error || err?.message || 'Erro desconhecido ao deletar';
        alert(mensagem);
        this.isDeleting.set(false)
      }
    })
  }
}