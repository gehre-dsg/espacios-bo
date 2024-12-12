import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  espacioId: string = ''; // ID del espacio seleccionado
  espacio: any = {}; // Detalles del espacio seleccionado

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.espacioId = params.get('id')!;
      this.obtenerEspacio(); // Obtener los detalles del espacio seleccionado
    });
  }

  obtenerEspacio(): void {
    // Aquí se simula obtener los detalles del espacio según el ID
    this.espacio = { id: this.espacioId, nombre: 'Plaza 1', descripcion: 'Una plaza hermosa' };
  }

  reservar(): void {
    // Aquí puedes implementar la lógica para procesar la reserva
    console.log('Reserva realizada para el espacio', this.espacio);
  }
}
