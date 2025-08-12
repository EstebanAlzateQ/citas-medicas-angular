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
   * Helper privado para obtener las cabeceras de autenticación.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Obtiene tus citas.
   */
  getCitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/citas`, { headers: this.getAuthHeaders() });
  }

   /**
   * Envía los datos de una nueva cita a la API para crearla.
   */
  createCita(citaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/citas`, citaData, { headers: this.getAuthHeaders() });
  }

   /**
   * Envía una petición para eliminar una cita específica.
   */
  deleteCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/citas/${id}`, { headers: this.getAuthHeaders() });
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

  /**
   * Descarga la agenda completa en formato Excel.
   * La respuesta se espera que sea un Blob (un tipo de objeto de archivo).
   */
  downloadExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/citas/export/excel`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob' // Esencial para manejar la descarga de archivos
    });
  }

  /**
   * Descarga el recordatorio de una cita específica en formato PDF.
   */
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/citas/${id}/pdf`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob' // Esencial para manejar la descarga de archivos
    });
  }
}