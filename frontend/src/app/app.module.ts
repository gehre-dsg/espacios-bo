import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel y ngForm
import { RouterModule } from '@angular/router'; // Para manejar rutas

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { appRoutes } from './app.routes'; // Asegúrate de que este archivo exista y exporte las rutas correctamente

@NgModule({
  declarations: [
    AppComponent,  // Declarar el componente raíz
    LoginComponent, // Declarar el componente de login
    HomeComponent,  // Declarar el componente de inicio
  ],
  imports: [
    BrowserModule,  // Módulo base para aplicaciones web
    FormsModule,    // Habilitar ngModel y formularios
    RouterModule.forRoot(appRoutes), // Configurar las rutas
  ],
  providers: [],
  bootstrap: [AppComponent], // Componente que se carga al iniciar la aplicación
})
export class AppModule {}
