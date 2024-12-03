import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly apiUrl = 'http://localhost:3000/usuarios';

  async createUsuario(data: { ci_usuario: number; email: string; contrasena: string }) {
    try {
      const response = await axios.post(this.apiUrl, data);
      return response.data;
    } catch (error: any) {
      console.error('Error al crear usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateUsuarioDatos(ci_usuario: number, data: any) {
    try {
      const response = await axios.patch(`${this.apiUrl}/${ci_usuario}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar datos del usuario:', error.response?.data || error.message);
      throw error;
    }
  }
}
