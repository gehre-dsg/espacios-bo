import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule], // Importar FormsModule aquí para habilitar ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };
  
  registerData = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  isRegistering = false;

  onSubmit() {
    console.log('Login Data:', this.loginData);
    // Aquí se procesará el login con un servicio.
  }

  onRegisterSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }
    console.log('Register Data:', this.registerData);
    // Aquí se procesará el registro con un servicio.
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }
}
