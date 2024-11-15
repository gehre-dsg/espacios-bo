// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal (Home)
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: '**', redirectTo: '' } // Redirige a Home si la ruta no existe
];
