import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), // Configurar rutas
    importProvidersFrom(BrowserModule, FormsModule), // Proveer módulos base
  ],
}).catch((err) => console.error(err));
