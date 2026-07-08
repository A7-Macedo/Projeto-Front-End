// dashboard.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { RoupasService } from '../../../core/services/roupas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink], // coloque aqui os módulos/components que o template usa
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  
  roupasService = inject(RoupasService);

  roupas = signal<any[]>([])
  isLoading = signal(false)
  isDeleting = signal(false)

  ngOnInit(): void {
    this.loadRoupas()
  }

  loadRoupas() {
    this.roupasService.getAll().subscribe({
      next: (res) => {
        console.log(res)
        this.roupas.set(res.data)
        this.isLoading.set(false)
      }
    })
  }

  abrirModalRoupa(): void {
    this.roupasService.abrirModal();
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