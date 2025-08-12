import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './citas-list.html',
  styleUrls: ['./citas-list.scss']
})
export class CitasList implements OnInit { // <-- Nombre corregido
  
  citas: any[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (response) => { this.citas = response; },
      error: (error) => { console.error('Error al cargar las citas:', error); }
    });
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      this.citaService.deleteCita(id).subscribe({
        next: () => {
          alert('Cita cancelada exitosamente.');
          this.cargarCitas(); 
        },
        error: (err) => {
          console.error('Error al cancelar la cita', err);
          alert('Hubo un error al cancelar la cita.');
        }
      });
    }
  }

  private saveAs(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  descargarExcel(): void {
    this.citaService.downloadExcel().subscribe({
      next: (blob) => {
        this.saveAs(blob, 'mi-agenda-medica.xlsx');
      },
      error: (httpErrorResponse) => {
        console.error('Error al descargar el archivo Excel', httpErrorResponse);
        if (httpErrorResponse.error instanceof Blob && httpErrorResponse.error.type === "application/json") {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            try {
              const errorResponse = JSON.parse(e.target.result);
              const errorMessage = `Error del servidor: ${errorResponse.message}\n\nArchivo: ${errorResponse.file}\n\nLínea: ${errorResponse.line}`;
              alert(errorMessage);
            } catch (jsonError) {
              alert('No se pudo leer el detalle del error del servidor, pero ocurrió un fallo.');
            }
          };
          reader.readAsText(httpErrorResponse.error);
        } else {
          alert('No se pudo descargar el archivo Excel. Por favor, inténtalo de nuevo.');
        }
      }
    });
  }

  descargarPdf(id: number): void {
    this.citaService.downloadPdf(id).subscribe({
      next: (blob) => {
        this.saveAs(blob, `recordatorio-cita-${id}.pdf`);
      },
      error: (err) => {
        console.error('Error al descargar el archivo PDF', err);
        alert('No se pudo descargar el archivo PDF. Por favor, inténtalo de nuevo.');
      }
    });
  }
}