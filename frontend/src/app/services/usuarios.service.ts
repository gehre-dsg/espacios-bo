import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly apiUrl = 'http://localhost:3000/usuarios';
  async createUsuario(data: { email: string; contrasena: string }) {
    try {
      const response = await axios.post(this.apiUrl, data);
      return response.data;
    } catch (error: any) {
      console.error(
        'Error al crear usuario:',
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
