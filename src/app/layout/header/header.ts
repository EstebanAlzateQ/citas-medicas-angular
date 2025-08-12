import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  template: `
    <nav class="navbar navbar-expand-lg" style="background-color: #AEC6CF;">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-white d-flex align-items-center" routerLink="/">
          <img src="https://i.imgur.com/GIwb5Ra.png" alt="Logo" width="90" height="90" class="me-3">
          <span class="fs-4">Clínica Bienestar</span>
        </a>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            
            <!-- Botones que se muestran si no has iniciado sesión -->
            <ng-container *ngIf="!authService.isLoggedIn()">
              <li class="nav-item">
                <a class="nav-link text-white fw-bold" routerLink="/login">Iniciar Sesión</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-bold" routerLink="/register">Registrarse</a>
              </li>
            </ng-container>

            <!-- Botones que se muestran si SÍ has iniciado sesión -->
            <ng-container *ngIf="authService.isLoggedIn()">
              <li class="nav-item">
                <a class="nav-link text-white fw-bold" routerLink="/citas">Mis Citas</a>
              </li>
              <li class="nav-item">
                <!-- Este botón llama a nuestra función de logout al hacer clic -->
                <button class="btn btn-link nav-link text-white fw-bold" (click)="logout()">Cerrar Sesión</button>
              </li>
            </ng-container>

          </ul>
        </div>
      </div>
    </nav>
  `
})
export class Header {
  // Inyectamos el AuthService para poder usarlo en la plantilla y en la clase
  constructor(public authService: AuthService) {}

  // Este método es llamado por el botón de "Cerrar Sesión"
  logout(): void {
    this.authService.logout();
  }
}
