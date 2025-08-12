import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { CitasList } from './citas/citas-list/citas-list';
import { CitaForm } from './citas/cita-form/cita-form';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
    {
        path: 'login', 
        component: Login 
    },
    {
        path: 'register', 
        component: Register 
    },
     {
        path: 'citas', 
        canActivate: [authGuard],
        children: [ 
          { path: '', component: CitasList }, 
          { path: 'nueva', component: CitaForm }, 
          { path: 'editar/:id', component: CitaForm } 
      ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
    
];