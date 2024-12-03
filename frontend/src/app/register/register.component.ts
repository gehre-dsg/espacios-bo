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
    ci_usuario: null,
    email: '',
    password: '',
    confirmPassword: '',
  };

  passwordError = '';
  emailError = '';
  ciUsuarioError = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  async onRegisterSubmit() {
    this.passwordError = '';
    this.emailError = '';
    this.ciUsuarioError = '';

    // Validar CI Usuario
    if (!this.registerData.ci_usuario || isNaN(this.registerData.ci_usuario)) {
      this.ciUsuarioError = 'El CI de usuario es obligatorio y debe ser un número válido';
      return;
    }

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
        ci_usuario: this.registerData.ci_usuario,
        email: this.registerData.email,
        contrasena: this.registerData.password,
      };

      const response = await this.usuariosService.createUsuario(usuario);
      console.log('Usuario registrado:', response);

      localStorage.setItem('ci_usuario', response.ci_usuario.toString());

      // Redirigir a la siguiente página de registro
      this.router.navigate(['/registro-datos']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }
}
