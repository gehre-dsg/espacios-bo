import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Necesario para trabajar con decoradores personalizados
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!roles) {
      // Si no se especifican roles, todos los usuarios pueden acceder
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Aquí se espera que el JWT haya sido validado previamente

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const hasRole = () => roles.includes(user.role); // Compara los roles permitidos con el rol del usuario

    if (!hasRole()) {
      throw new UnauthorizedException('No tienes los permisos necesarios');
    }

    return true;
  }
}
