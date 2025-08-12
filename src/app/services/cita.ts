import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene tus citas.
   */
  getCitas(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    //  Creamos las cabeceras HTTP, incluyendo el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/citas`, { headers: headers });
  }

   /**
   * Envía los datos de una nueva cita a la API para crearla.
   */
  createCita(citaData: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/citas`, citaData, { headers: headers });
  }

   /**
   * Envía una petición para eliminar una cita específica.
   */
  deleteCita(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/citas/${id}`, { headers: headers });
  }
  /**
   * Obtiene los datos de una única cita por su ID.
   */
  getCita(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/citas/${id}`, { headers: headers });
  }

  /**
   * Envía los datos actualizados de una cita a la API.
   */
  updateCita(id: number, citaData: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/citas/${id}`, citaData, { headers: headers });
  }

  
}
