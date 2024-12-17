import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspacioPublicoService } from '../../services/espacios-publicos.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  espacio: any; // Para almacenar el espacio seleccionado
  reserva = {
    nombre: '',
    ci: '',
    otb: '',
    tipoEvento: '',
    sector: '',
    fecha: '',
    tarjeta: '',
  };

  constructor(private espacioService: EspacioPublicoService) {}

  ngOnInit(): void {
    // Obtener el espacio seleccionado desde el servicio
    this.espacio = this.espacioService.getEspacioSeleccionado();

    if (!this.espacio) {
      console.error('No hay espacio seleccionado.');
      // Redirigir o manejar el caso de no tener un espacio
    }
  }

  reservar() {
    // Aquí puedes enviar la información de la reserva al backend o procesarla localmente
    console.log('Datos de la reserva:', this.reserva);

    // Agrega el espacio seleccionado como parte de la reserva
    const reservaFinal = {
      ...this.reserva,
      espacio: this.espacio.nombre,
    };

    // Ejemplo de impresión en consola
    console.log('Reserva final con espacio seleccionado:', reservaFinal);

    // Aquí podrías hacer una llamada HTTP si tienes un servicio configurado
    // Ejemplo:
    // this.espacioService.realizarReserva(reservaFinal).then(...).catch(...);
  }
}
