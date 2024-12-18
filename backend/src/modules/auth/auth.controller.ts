import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; contrasena: string }) {
    // Validamos al usuario con el email y la contraseña proporcionados
    const user = await this.authService.validateUser(loginDto.email, loginDto.contrasena);
    
    // Si el usuario es válido, generamos el token JWT
    if (!user) {
      throw new Error('Credenciales inválidas');  // O personaliza el mensaje de error según sea necesario
    }

    // Generamos y devolvemos el JWT
    return this.authService.login(user);
  }
}
