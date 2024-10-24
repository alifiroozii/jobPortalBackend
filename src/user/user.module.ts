import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Module({
  imports: [PassportModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
})
export class UsersModule {}
