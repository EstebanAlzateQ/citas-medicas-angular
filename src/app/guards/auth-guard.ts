import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  
  // Inyectamos nuestros servicios de forma funcional 
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el servicio dice que el usuario está logueado, permite el acceso.
  if (authService.isLoggedIn()) {
    return true;
  }

  // Si no, redirige al login y bloquea el acceso.
  console.log('Acceso denegado por el AuthGuard. Redirigiendo a /login...');
  router.navigate(['/login']);
  return false;
};
