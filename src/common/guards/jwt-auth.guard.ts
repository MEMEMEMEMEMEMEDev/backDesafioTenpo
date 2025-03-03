import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from './interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
