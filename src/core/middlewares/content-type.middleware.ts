import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Request, Response } from 'hyper-express';
import { parse } from 'content-type';
import { SetContentType } from '@core/decorators/accept-content-type.decorator';

export const X_CONTENT_TYPE = 'content-type';
export function contentTypeMiddleware(req: Request, res: Response, next: any) {
  const contentType = req.header('Content-Type');
  if (!contentType) return next();
  const { type } = parse(contentType);
  if (SetContentType.has(type)) {
    return next();
  }
  throw new UnsupportedMediaTypeException(
    `Content-Type ${contentType} is not supported in this route`,
  );
}
