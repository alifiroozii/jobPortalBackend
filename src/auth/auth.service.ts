import { Injectable, BadRequestException, Req, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/authdto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserRole, CreateUserDto } from '../auth/authdto/create.user.dto';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  // ثبت‌نام کاربر
  async registerEmployer(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    if (!name || !email || !password) {
      throw new BadRequestException({ message: 'لطفاً همه فیلدها را پر کنید.' });
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException({ message: 'کاربری با این ایمیل از قبل وجود دارد.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.KARFARMA,
      },
    });

    const { password: _, ...result } = newUser;
    return result;
  }

  async registerJobSeeker(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    if (!name || !email || !password) {
      throw new BadRequestException({ message: 'لطفاً همه فیلدها را پر کنید.' });
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException({ message: 'کاربری با این ایمیل از قبل وجود دارد.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.KARJOO,
      },
    });

    const { password: _, ...result } = newUser;
    return result;
  }

  // ورود کارجو
  async loginJobSeeker(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException({ message: 'لطفاً ایمیل و رمز عبور را وارد کنید.' });
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== UserRole.KARJOO) {
      throw new BadRequestException({ message: 'کارجویی با این ایمیل وجود ندارد.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException({ message: 'رمز عبور اشتباه است.' });
    }

    const token = this.jwtService.sign({ userId: user.id, role: user.role });
    res.clearCookie('jwt');
    res.clearCookie('token');

    const { password: _, ...userWithoutPassword } = user;

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: 'ورود موفقیت‌آمیز به عنوان کارجو',
      user: userWithoutPassword,
    });
  }

  // ورود کارفرما
  async loginEmployer(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException({ message: 'لطفاً ایمیل و رمز عبور را وارد کنید.' });
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== UserRole.KARFARMA) {
      throw new BadRequestException({ message: 'کارفرمایی با این ایمیل وجود ندارد.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException({ message: 'رمز عبور اشتباه است.' });
    }

    const token = this.jwtService.sign({ userId: user.id, role: user.role });
    res.clearCookie('jwt');
    res.clearCookie('token');

    const { password: _, ...userWithoutPassword } = user;

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: 'ورود موفقیت‌آمیز به عنوان کارفرما',
      user: userWithoutPassword,
    });
  }

  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('token');
    return res.status(200).json({ message: 'شما با موفقیت خارج شدید.' });
  }
}
