import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    ConfigModule, // اضافه کردن ConfigModule برای بارگذاری متغیرهای محیطی
    JwtModule.register({
      secret: process.env.JWT_SECRET, // کلید مخفی برای امضای توکن
      signOptions: { expiresIn: '1h' }, // زمان انقضای توکن
    }),
    PassportModule, // اضافه کردن PassportModule
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // اضافه کردن JwtStrategy و JwtAuthGuard به providers
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard], // اگر بخواهید این سرویس و گارد را در ماژول‌های دیگر استفاده کنید
})
export class AuthModule {}
