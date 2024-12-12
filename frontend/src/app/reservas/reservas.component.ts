import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent {
  constructor(private router: Router) {}

  // Función para navegar a los espacios según el tipo (plazas, áreas deportivas, cultura)
  navigateToSpaces(tipo: string): void {
    this.router.navigate([`/reservas/${tipo}`]);
  }
}
