import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.usersService.create(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokens = await this.authService.login(user);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({ accessToken: tokens.accessToken });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.json({ message: 'Logout exitoso' });
  }
}
