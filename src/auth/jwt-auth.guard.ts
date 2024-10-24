import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = request.cookies['token']; // بررسی وجود توکن
    console.log('Token:', token);

    if (!token) {
      throw new ForbiddenException('دسترسی ممنوع. شما باید وارد شده باشید.');
    }
    console.log('Token:', token);
    // فراخوانی متد والد canActivate برای اعتبارسنجی توکن
    const canActivate = await super.canActivate(context);

    if (canActivate instanceof Observable) {
      return canActivate.toPromise().then(result => result);
    }

    return canActivate; // بازگشت مقدار اعتبارسنجی
  }
}

