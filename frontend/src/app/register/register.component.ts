import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // Datos del formulario
  registerData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  // Método para manejar el envío del formulario de registro
  onRegisterSubmit() {
    console.log('Datos de registro:', this.registerData);
    // Aquí puedes agregar el código para manejar el registro (con un servicio, por ejemplo)
  }
}
