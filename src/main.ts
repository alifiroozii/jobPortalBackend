import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // app.use(cookieParser());

  // فعال‌سازی CORS
  app.enableCors({
    origin: 'http://localhost:3000', // مبدأ مجاز (می‌توانید '*' برای همه مبدأها استفاده کنید)
    methods: 'GET,POST,PUT,DELETE', // متدهای مجاز
    //credentials: true, // اجازه دادن به ارسال کوکی‌ها
  });

  await app.listen(process.env.PORT ?? 5000); // پورت 5000 به عنوان پیش‌فرض
}
bootstrap();
