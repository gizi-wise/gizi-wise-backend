import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP');
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isResponseHTTPException = ctx.getResponse() instanceof HttpException;
    const error = isResponseHTTPException ? ctx.getResponse() : exception;

    const response = isResponseHTTPException
      ? ctx.getRequest()
      : ctx.getResponse();

    const httpStatus = error.getStatus
      ? error.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseError = error.getResponse ? error.getResponse() : error;

    const responseBody = {
      statusCode: httpStatus,
      messages: Array.isArray(responseError.message)
        ? responseError.message
        : [responseError.message],
      data: {},
    };

    if (
      httpStatus >= HttpStatus.INTERNAL_SERVER_ERROR ||
      this.configService.get('NODE_ENV') === 'development'
    ) {
      this.logger.error(
        `${response.route.method} ${response.route.pattern} - ${httpStatus} - ${error.message}`,
      );
      console.error(error);
    }
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
