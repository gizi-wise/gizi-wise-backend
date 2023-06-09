import {
  ContentTypes,
  CONTENT_TYPE_KEY,
} from '@core/decorators/accept-content-type.decorator';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { parse } from 'content-type';

@Injectable()
export class ContentTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const acceptedContentType = this.reflector.getAllAndOverride<
      Set<ContentTypes>
    >(CONTENT_TYPE_KEY, [context.getHandler(), context.getClass()]);
    if (!acceptedContentType) {
      return true;
    }
    const requestContentType = context
      .switchToHttp()
      .getRequest()
      .header('Content-Type');
    if (!requestContentType) {
      throw new UnsupportedMediaTypeException(
        `Content-Type is needed but not provided`,
      );
    }
    const { type } = parse(requestContentType);
    if (!acceptedContentType.has(type)) {
      throw new UnsupportedMediaTypeException(
        `Content-Type ${requestContentType} is not supported`,
      );
    }
    return true;
  }
}
