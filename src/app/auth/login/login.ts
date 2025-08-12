import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  
  template: `
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div style="max-width: 350px; width: 100%;">
        <div class="text-center mb-4">
          •	<img src="https://i.imgur.com/j7WfKgj.png" alt="Logo" width="200" height="200" class="mb-4">
        </div>
        <div class="card text-center shadow-sm" style="border: 1px solid #dbdbdb;">
          <div class="card-body p-4">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              
              <!-- CAMPO EMAIL CON VALIDACIÓN -->
              <div class="text-start mb-3">
                <label for="email" class="form-label fw-bold">Correo Electrónico</label>
                <input type="email" id="email" class="form-control" formControlName="email" 
                       [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                
                <!-- Mensajes de error para el email -->
                @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
                  <div class="text-danger mt-1 small">El correo es obligatorio.</div>
                }
                @if (loginForm.get('email')?.hasError('email') && loginForm.get('email')?.touched) {
                  <div class="text-danger mt-1 small">Por favor, introduce un correo válido.</div>
                }
              </div>
              
              <!-- CAMPO CONTRASEÑA CON VALIDACIÓN -->
              <div class="text-start mt-3">
                <label for="password" class="form-label fw-bold">Contraseña</label>
                <input type="password" id="password" class="form-control" formControlName="password"
                       [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                
                <!-- Mensaje de error para la contraseña -->
                @if (loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched) {
                  <div class="text-danger mt-1 small">La contraseña es obligatoria.</div>
                }
              </div>

              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary fw-bold" [disabled]="loginForm.invalid">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-center shadow-sm mt-3" style="border: 1px solid #dbdbdb;">
          <div class="card-body">
            <p class="mb-0">¿No tienes una cuenta? <a routerLink="/register" class="text-decoration-none fw-bold">Regístrate</a></p>
          </div>
        </div>
      </div>
    </div>
  `
  // Ya no necesitamos estilos aquí, Bootstrap lo hace todo.
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.invalid) { return; }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.access_token);
        this.router.navigate(['/citas']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        alert('Las credenciales son incorrectas.');
      }
    });
  }
}