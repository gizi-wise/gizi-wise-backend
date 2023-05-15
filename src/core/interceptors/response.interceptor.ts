import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((responseData) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: typeof responseData === 'string' ? [responseData] : [],
        data: typeof responseData === 'string' ? {} : responseData,
      })),
    );
  }
}
