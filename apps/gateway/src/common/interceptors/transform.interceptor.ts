import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          message: 'ok',
          data: data ?? instanceToPlain(data),
        };
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
