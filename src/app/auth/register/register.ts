import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="col-md-6 col-lg-5">
        <div class="text-center mb-4">
          •	<img src="https://i.imgur.com/j7WfKgj.png" alt="Logo" width="200" height="200" class="mb-4">
        </div>
        <div class="card shadow-sm" style="border: 1px solid #dbdbdb;">
          <div class="card-body p-4">
            <h3 class="text-center text-muted mb-3">Crea tu cuenta para empezar a agendar citas</h3>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="nombre_completo" formControlName="nombre_completo" placeholder="Nombre Completo">
                <label for="nombre_completo">Nombre Completo</label>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" formControlName="email" placeholder="tu@email.com">
                <label for="email">Correo Electrónico</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" formControlName="password" placeholder="Contraseña">
                <label for="password">Contraseña</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password_confirmation" formControlName="password_confirmation" placeholder="Confirmar Contraseña">
                <label for="password_confirmation">Confirmar Contraseña</label>
              </div>

              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-success fw-bold" [disabled]="registerForm.invalid">
                  Registrarme
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-center shadow-sm mt-3" style="border: 1px solid #dbdbdb;">
          <div class="card-body">
            <p class="mb-0">¿Ya tienes una cuenta? <a routerLink="/login" class="text-decoration-none fw-bold">Inicia Sesión</a></p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Register {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    nombre_completo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('¡Registro exitoso!', response);
        alert('¡Te has registrado exitosamente! Ahora inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un error en el registro. Es posible que el correo ya esté en uso.');
      }
    });
  }
}
