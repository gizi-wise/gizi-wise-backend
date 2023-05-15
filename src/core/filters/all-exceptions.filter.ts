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

  catch(exception: any, host: ArgumentsHost): void {
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
            statusCode: httpStatus,
            message: exception.message ? [exception.message] : [],
            data: {},
          };
    delete responseBody.error;
    responseBody.data = {};

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
