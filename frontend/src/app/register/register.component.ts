import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  passwordError = '';
  emailError = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  async onRegisterSubmit() {
    this.passwordError = '';
    this.emailError = '';

    // Validar contraseñas
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      this.emailError = 'El formato del email es inválido';
      return;
    }

    try {
      const usuario = {
        email: this.registerData.email,
        contrasena: this.registerData.password,
      };

      const response = await this.usuariosService.createUsuario(usuario);
      console.log('Usuario registrado:', response);

      // Redirigir a la siguiente página de registro
      this.router.navigate(['/registro-datos']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }
}
