import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly apiUrl = '/usuarios';

  constructor(private axiosService: AxiosService) {}

  // Token fijo para superadministrador (esto será cambiado más adelante)
  private readonly superAdminToken = 'SuperToken';

  // Método para obtener los encabezados con el token de superadministrador
  private getAuthHeaders() {
    return {
      Authorization: this.superAdminToken,
    };
  }

  async getUsuarios() {
    try {
      const response = await this.axiosService.getAxiosInstance().get(this.apiUrl, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener usuarios:', error.response?.data || error.message);
      throw error;
    }
  }

  async createUsuario(data: { ci_usuario: number; email: string; contrasena: string }) {
    try {
      const response = await this.axiosService.getAxiosInstance().post(this.apiUrl, data, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Error al crear usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateUsuarioDatos(ci_usuario: number, data: any) {
    try {
      const response = await this.axiosService.getAxiosInstance().patch(
        `${this.apiUrl}/${ci_usuario}`,
        data,
        {
          headers: this.getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar datos del usuario:', error.response?.data || error.message);
      throw error;
    }
  }
}
