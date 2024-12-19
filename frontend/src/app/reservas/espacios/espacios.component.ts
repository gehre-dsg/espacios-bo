import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EspacioPublicoService } from '../../services/espacios-publicos.service';

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [CommonModule, RouterLink],  // Agregar RouterModule
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.scss']
})
export class EspaciosComponent implements OnInit {
  espacios: any[] = [];
  tipo: any ='';

  constructor(private espacioPublicoService: EspacioPublicoService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe((params) => {
      this.tipo = params.get('tipo');
      console.log('tipo recibido:', this.tipo);
    });
    try {
      this.espacios = await this.espacioPublicoService.getByType(this.tipo);
      console.log('Datos cargados correctamente', this.espacios);
    } catch (error) {
      console.error('Error al cargar los espacios publicos:', error);
    }
  }

  selecEspacio(espacio: any) {
    this.espacioPublicoService.setEspacioSeleccionado(espacio);
  }
}