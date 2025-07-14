
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MyLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('is pre-Interceptor before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`is post-Interceptor after... ${Date.now() - now}ms`)),
      );
  }
}
