import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const messageLog = `${method} ${url}`;
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${messageLog} - ${response.statusCode} - ${Date.now() - now}ms`,
        );
      }),
      catchError((err) => {
        const status = err.status;
        const errorMessage = err.response?.message;
        if (status < 500) {
          this.logger.warn(`${messageLog} - ${status} - ${Date.now() - now}ms`);
        } else {
          this.logger.error(
            `${messageLog} - ${status} - ${Date.now() - now}ms`,
          );
        }
        if (errorMessage && !(errorMessage instanceof Array)) {
          err.response.message = [errorMessage];
        }
        return throwError(() => err);
      }),
    );
  }
}
