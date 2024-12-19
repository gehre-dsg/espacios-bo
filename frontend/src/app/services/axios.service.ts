import { Injectable, Injector } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor(private injector: Injector) {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    this.axiosInstance.interceptors.request.use((config) => {
      const authService = this.injector.get(AuthService); // Resolver AuthService dinámicamente
      const token = authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
