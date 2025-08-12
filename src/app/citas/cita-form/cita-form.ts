import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { MedicoService } from '../../services/medico';
import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Header, Footer],
  template: `
    <app-header></app-header>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-7">
          <div class="card shadow-sm">
            <div class="card-header">
              <h3>{{ isEditMode ? 'Editar Cita' : 'Agendar Nueva Cita' }}</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="citaForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="medico" class="form-label">Médico</label>
                  <select id="medico" class="form-select" formControlName="medico_id">
                    <option [value]="null" disabled>Selecciona un médico...</option>
                    @for (medico of medicos; track medico.id) {
                      <option [value]="medico.id">{{ medico.nombre_completo }} - ({{ medico.especialidad }})</option>
                    }
                  </select>
                </div>
                <div class="mb-3">
                  <label for="fecha_hora" class="form-label">Fecha y Hora</label>
                  <input type="datetime-local" id="fecha_hora" class="form-control" formControlName="fecha_hora">
                </div>
                <div class="mb-3">
                  <label for="motivo_consulta" class="form-label">Motivo de la Consulta</label>
                  <textarea id="motivo_consulta" class="form-control" formControlName="motivo_consulta" rows="3"></textarea>
                </div>
                <div class="d-flex justify-content-end mt-4">
                  <a routerLink="/citas" class="btn btn-secondary me-2">Cancelar</a>
                  <button type="submit" class="btn btn-primary" [disabled]="citaForm.invalid">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class CitaForm implements OnInit {
  
  medicos: any[] = [];
  citaForm = new FormGroup({
    medico_id: new FormControl(null, [Validators.required]),
    fecha_hora: new FormControl('', [Validators.required]),
    motivo_consulta: new FormControl('', [Validators.required]),
  });

  isEditMode = false;
  private citaId: string | null = null;

  constructor(
    private medicoService: MedicoService,
    private citaService: CitaService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.medicoService.getMedicos().subscribe(data => this.medicos = data);

    // Leemos el parámetro 'id' de la URL
    this.citaId = this.route.snapshot.paramMap.get('id');
    if (this.citaId) {
      this.isEditMode = true;
      // Si hay un ID, estamos en modo edición. Pedimos los datos de la cita.
      this.citaService.getCita(+this.citaId).subscribe(cita => {
        // Usamos patchValue para rellenar el formulario con los datos de la cita.
        this.citaForm.patchValue(cita);
      });
    }
  }

  onSubmit(): void {
    if (this.citaForm.invalid) return;

    if (this.isEditMode && this.citaId) {
      // MODO EDICIÓN: llamamos a updateCita
      this.citaService.updateCita(+this.citaId, this.citaForm.value).subscribe({
        next: () => {
          alert('¡Cita actualizada exitosamente!');
          this.router.navigate(['/citas']);
        }
      });
    } else {
      // MODO CREACIÓN: llamamos a createCita
      this.citaService.createCita(this.citaForm.value).subscribe({
        next: () => {
          alert('¡Cita creada exitosamente!');
          this.router.navigate(['/citas']);
        }
      });
    }
  }
}