import {
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SecurityService } from './security.service';
import { Request, Response } from 'express';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('No hay token de refresh');
    }

    const newAccessToken =
      this.securityService.refreshAccessToken(refreshToken);

    return res.json({ accessToken: newAccessToken });
  }
}
