import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const error =
      ctx.getResponse() instanceof HttpException
        ? ctx.getResponse()
        : exception;

    const response =
      ctx.getResponse() instanceof HttpException
        ? ctx.getRequest()
        : ctx.getResponse();

    const httpStatus =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: any =
      error instanceof HttpException
        ? error.getResponse()
        : { statusCode: httpStatus, message: exception.message, data: {} };

    delete responseBody.error;
    responseBody.messages = Array.isArray(responseBody.message)
      ? responseBody.message
      : [responseBody.message];
    delete responseBody.message;
    responseBody.data = {};
    if (
      httpStatus >= HttpStatus.INTERNAL_SERVER_ERROR ||
      this.configService.get('NODE_ENV') === 'development'
    ) {
      console.error(error);
    }
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
