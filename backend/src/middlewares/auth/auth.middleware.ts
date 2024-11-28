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
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('token de autorizacion faltante');
    }

    //simular token
    const rolesMap = {
      'SuperToken': { id: 1, rol: 'super-admin' },
      'AdminToken': { id: 2, rol: 'admin' },
      'UserToken': { id: 3, rol: 'user' },
    };

    const user = rolesMap[token];
    if (!user) {
      throw new UnauthorizedException('token invalido');
    }

    req['user'] = user;
    console.log(`Usuario autenticado: ${JSON.stringify(user)}`);
    next();
  }
}
