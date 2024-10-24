import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { UsersModule } from './user/user.module'; // Import UserModule

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Register ConfigModule globally
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
