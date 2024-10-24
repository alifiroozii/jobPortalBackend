import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/authdto/create.user.dto';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
