import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url } = request; // Obtener la URL de la solicitud

    // Lógica de autenticación normal para otras rutas
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No se ha proporcionado el token');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user; // Adjuntar el usuario al request
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }
}
