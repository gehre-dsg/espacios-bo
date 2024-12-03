import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = [
      { path: '/usuarios', method: 'POST' },
    ];

    const isPublicRoute = publicRoutes.some(
      (route) => req.path.startsWith(route.path) && req.method === route.method,
    );

    if (isPublicRoute) {
      console.log(`Ruta pública accedida: ${req.method} ${req.path}`);
      return next();
    }

    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token de autorización faltante');
    }

    const rolesMap = {
      SuperToken: { id: 1, rol: 'super-admin' },
      AdminToken: { id: 2, rol: 'admin' },
      UserToken: { id: 3, rol: 'user' },
    };

    const user = rolesMap[token];
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    req['user'] = user;
    console.log(`Usuario autenticado: ${JSON.stringify(user)}`);
    next();
  }
}
