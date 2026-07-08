import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  authService = inject(AuthService)
}