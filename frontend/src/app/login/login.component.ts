import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Importar FormsModule aquí para habilitar ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  onSubmit() {
    console.log('Datos enviados:', this.loginData);
    // Aquí se procesará el login con un servicio.
  }
}
