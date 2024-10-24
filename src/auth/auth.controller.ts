// src/auth/auth.controller.ts
import { Body, Controller, Post, Res,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserRole } from '../auth/authdto/create.user.dto';
import { LoginDto } from '../auth/authdto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ثبت‌نام کارجو
  @Post('register-job-seeker')
  async registerJobSeeker(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = UserRole.KARJOO; // تعیین نقش کارجو
    return this.authService.registerJobSeeker(createUserDto);
  }
  
  // ثبت‌نام کارفرما
  @Post('register-employer')
  async registerEmployer(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = UserRole.KARFARMA; // تعیین نقش کارفرما
    return this.authService.registerEmployer(createUserDto);
  }
  

  // ورود کارجو
  @Post('login-job-seeker')
  async loginJobSeeker(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.loginJobSeeker(loginDto, res);
  }

  // ورود کارفرما
  @Post('login-employer')
  async loginEmployer(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.loginEmployer(loginDto, res);
  }


  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // حذف کوکی توکن
    res.clearCookie('token');
    
    // برگرداندن پاسخ موفقیت‌آمیز
    return res.status(200).json({ message: 'شما با موفقیت خارج شدید.' });
  }
}
