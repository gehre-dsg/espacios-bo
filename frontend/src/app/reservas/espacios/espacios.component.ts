import { Component } from '@angular/core';
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
export class EspaciosComponent {
  espacios: any[] = [
    { id: 1, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 1' },
    { id: 2, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 2' },
    { id: 3, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 3' },
    { id: 4, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 4' },
    { id: 5, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 5' },
    { id: 6, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 6' },
    { id: 7, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 7' },
    { id: 8, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 8' },
    { id: 9, imagen: 'https://via.placeholder.com/150', nombre: 'Espacio 9' },
  ];
}
