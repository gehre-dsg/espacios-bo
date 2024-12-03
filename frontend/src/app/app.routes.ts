import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RegistroDatosComponent } from './registro-datos/registro-datos.component';
import { AdminComponent } from './admin/admin.component'; // Importar AdminComponent

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registro-datos', component: RegistroDatosComponent },
  { path: 'admin', component: AdminComponent }, // Nueva ruta para administración
  { path: '**', redirectTo: 'home' },
];
