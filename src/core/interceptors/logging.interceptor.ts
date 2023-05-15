import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}
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
        const status = err.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = err.response?.message;
        if (status < 500) {
          this.logger.warn(`${messageLog} - ${status} - ${Date.now() - now}ms`);
        } else {
          if (this.configService.get('NODE_ENV') === 'development') {
            console.error(err);
          }
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
