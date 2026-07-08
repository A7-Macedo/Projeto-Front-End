import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm implements OnInit {

  private categorieService = inject(CategoriesService)
  categorias = signal<any[]>([])

  categorieForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl("")
  })


  ngOnInit(): void {
    this.loadCategories()
  }


  loadCategories() {
    this.categorieService.get().subscribe((res) => {
      this.categorias.set(res.data)
    })
  }

  onSubmit() {
    const values = this.categorieForm.value
    const formData = new FormData

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    this.categorieService.post(formData).subscribe({
      next: () => {
        alert("Cadastrado!")
        this.loadCategories()
      }, error: (err) => { alert(err.error.error) }
    })
  }
}
