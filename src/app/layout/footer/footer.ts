import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="text-center p-4 mt-auto" style="background-color: #e9ecef;">
      <p class="text-muted">&copy; 2025 Clínica Bienestar. Todos los derechos reservados.</p>
    </footer>
  `
})
export class Footer {}