import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import axios from 'axios';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [CommonModule], // Agrega CommonModule aquí
})
export class AdminComponent implements OnInit {
  users: any[] = []; // Lista de usuarios

  constructor() {}

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    try {
      const token = 'SuperToken'; // Simular token, ajusta según el almacenamiento local
      const response = await axios.get('http://localhost:3000/usuarios', {
        headers: {
          Authorization: token,
        },
      });
      this.users = response.data;
    } catch (error: any) {
      console.error('Error al obtener usuarios:', error.response?.data || error.message);
    }
  }
}
