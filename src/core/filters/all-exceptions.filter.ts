import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            error: 'Internal Server Error',
            message: exception,
            data: {},
          };
    if (typeof responseBody === 'object' && 'statusCode' in responseBody) {
      delete responseBody.statusCode;
      responseBody.error = responseBody.error ?? responseBody.message[0];
      responseBody.data = {};
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
