import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Devuelve el token almacenado.
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Devuelve true si el usuario está logueado.
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Guardamos el token cuando el login es exitoso.
        if (response.access_token) {
          localStorage.setItem('auth_token', response.access_token);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Llamamos a la API para invalidar el token en el backend.
      this.http.post(`${this.apiUrl}/logout`, {}, { headers: headers }).subscribe({
        next: () => this.handleLogout(),
        error: () => this.handleLogout() 
      });
    }
  }

  // Método privado para limpiar el frontend.
  private handleLogout(): void {
    localStorage.removeItem('auth_token'); 
    this.router.navigate(['/login']); 
  }
}