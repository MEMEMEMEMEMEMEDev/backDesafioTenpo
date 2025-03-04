import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SecurityService } from '../security/security.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private securityService: SecurityService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  async login(user: any) {
    return {
      accessToken: this.securityService.generateAccessToken(user),
      refreshToken: this.securityService.generateRefreshToken(user),
    };
  }
}
