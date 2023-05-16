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
        : ctx.getResponse() instanceof HttpException
        ? ctx.getResponse().getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : ctx.getResponse() instanceof HttpException
        ? ctx.getResponse().response
        : { statusCode: httpStatus, message: exception.message, data: {} };

    delete responseBody.error;
    responseBody.data = {};
    responseBody.message = Array.isArray(responseBody.message)
      ? responseBody.message
      : [responseBody.message];

    const response =
      ctx.getResponse() instanceof HttpException
        ? ctx.getRequest()
        : ctx.getResponse();

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
