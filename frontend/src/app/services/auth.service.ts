import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = '/auth';

  constructor(private axiosService: AxiosService) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.axiosService.getAxiosInstance().post(
        `${this.apiUrl}/login`,
        { email, contrasena: password }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      throw error;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
