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
  template: `
    <app-header></app-header>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>Mis Citas Agendadas</h3>
        <a routerLink="/citas/nueva" class="btn btn-primary">
          <i class="bi bi-plus-circle-fill me-2"></i>Agendar Nueva Cita
        </a>
      </div>

      @if (citas.length === 0) {
        <div class="alert alert-info">
          Aún no tienes ninguna cita agendada.
        </div>
      } @else {
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Fecha y Hora</th>
                <th>Motivo</th>
                <th>Estado</th>
                <th>Acciones</th> 
              </tr>
            </thead>
            <tbody>
              @for (cita of citas; track cita.id) {
                <tr>
                  <td>{{ cita.medico.nombre_completo }}</td>
                  <td>{{ cita.medico.especialidad }}</td>
                  <td>{{ cita.fecha_hora | date:'dd/MM/yyyy h:mm a' }}</td>
                  <td>{{ cita.motivo_consulta }}</td>
                  <td><span class="badge bg-success">{{ cita.estado }}</span></td>
                  <td>
                    <a [routerLink]="['/citas/editar', cita.id]" class="btn btn-secondary btn-sm me-2">Editar</a>
                    <button class="btn btn-danger btn-sm" (click)="cancelarCita(cita.id)">
                       Cancelar
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
    <app-footer></app-footer>
  `
})
export class CitasList implements OnInit {
  
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

  // Función para cancelar la cita
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
}