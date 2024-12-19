import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspacioPublicoService } from '../../services/espacios-publicos.service';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  espacio: any;
  reserva = {
    nombre: '',
    ci: '',
    otb: '',
    tipoEvento: '',
    sector: '',
    fecha: '',
    tarjeta: '',
  };

  constructor(private espacioService: EspacioPublicoService, private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.espacio = this.espacioService.getEspacioSeleccionado();
    console.log(this.espacio.data);

    if (!this.espacio) {
      console.error('No hay espacio seleccionado.');
    }
  }

  ngSubmit() {
    this.reservar();
  }

  async reservar() {
    console.log('Datos de la reserva:', this.reserva);

    const reservaFinal = {
      usuario: Number(this.reserva.ci),
      espacio_publico: this.espacio._id,
      fecha: this.reserva.fecha,
      hora_inicio: '8:00:00',
      hora_fin: '18:00:00'
    };
    console.log(reservaFinal);
    try {
      const response = await this.reservaService.postReserva(reservaFinal);
      return response.data;
    } catch (error: any){
      console.log('No se pudo realizar la reserva');
      throw error;
    }
  }
}
