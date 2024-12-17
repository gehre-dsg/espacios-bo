import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
    providedIn: 'root',
})
export class EspacioPublicoService { // ESTE SERVICIO ES PARA DATOS DE SOLO LECTURA (ESTATICOS)
    private readonly apiUrl = '/espacios-publicos';

    constructor(private axiosService: AxiosService) { }

    async getAll() {
        try {
            const response = await this.axiosService.getAxiosInstance().get(this.apiUrl);
            return response.data;
        } catch (error: any) {
            console.error('Error al obtener los espacios publicos:', error.response?.data || error.message);
            throw error;
        }
    }

    async getOneByName(name: string): Promise<any> {
        if (!name || name.trim() === '') {
            throw new Error('El nombre proporcionado no es valido');
        }
        try {
            const response = await this.axiosService.getAxiosInstance().get(`${this.apiUrl}/${name}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error al obtener el espacio publico con nombre "${name}":`, error.response?.data || error.message);
            throw error;
        }
    }

    async getOneById(id: number): Promise<any> {
        if (!id || id <= 0) {
            throw new Error('El ID proporcionado no es valido');
        }
        try {
            const response = await this.axiosService.getAxiosInstance().get(`${this.apiUrl}/${id}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error al obtener el espacio publico con ID "${id}":`, error.response?.data || error.message);
            throw error;
        }
    }
}
