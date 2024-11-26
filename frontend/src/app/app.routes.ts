import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a la página de inicio
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
