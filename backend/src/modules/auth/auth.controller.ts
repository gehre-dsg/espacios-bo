import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: { email: string; contrasena: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.contrasena);
    return this.authService.login(user);
}
}
