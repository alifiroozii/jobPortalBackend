import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies['token']]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // کلید مخفی شما
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, role: payload.role }; // بازگشت اطلاعات کاربر
  }
}
