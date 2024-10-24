import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/authdto/create.user.dto'; // اضافه کردن DTO

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('alluser')
  @UseGuards(JwtAuthGuard) // استفاده از گارد

  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
