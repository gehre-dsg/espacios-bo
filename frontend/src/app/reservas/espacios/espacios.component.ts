import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacioPublicoService } from '../../services/espacios-publicos.service';
import { RouterModule } from '@angular/router'; // IMPORTANTE: Asegúrate de importar RouterModule

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Agregar RouterModule
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.scss']
})
export class EspaciosComponent implements OnInit {
  espacios: any[] = [];

  constructor(private espacioPublicoService: EspacioPublicoService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.espacios = await this.espacioPublicoService.getAll();
      console.log('Datos cargados correctamente', this.espacios);
    } catch (error) {
      console.error('Error al cargar los espacios publicos:', error);
    }
  }
}