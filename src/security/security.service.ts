import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(user: { email: string; id: number }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  generateRefreshToken(user: { email: string; id: number }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  verifyAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
      });
      return this.generateAccessToken({
        email: payload.email,
        id: payload.sub,
      });
    } catch (error) {
      throw new UnauthorizedException('Refresh Token inválido o expirado');
    }
  }
}
