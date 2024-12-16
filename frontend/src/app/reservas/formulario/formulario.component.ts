import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

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

  iniciarMapa(): void {
    const map = L.map('map').setView([-34.601, -58.379], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Hacer una solicitud GET a la API para obtener las coordenadas
    fetch('/api/espacios-publicos')
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          // Crear un marcador por cada coordenada
          L.marker([item.lat, item.lng])
            .addTo(map)
            .bindPopup(`<b>${item.nombre}</b><br>${item.descripcion}`);
        });
      })
      .catch(error => console.error('Error al cargar los datos del mapa:', error));
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
