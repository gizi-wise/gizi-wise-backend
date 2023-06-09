import { SetMetadata } from '@nestjs/common';

export const CONTENT_TYPE_KEY = 'content-type';
export enum ContentTypes {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
  URLENCODED = 'application/x-www-form-urlencoded',
  TEXT_PLAIN = 'text/plain',
  BUFFER = 'application/octet-stream',
}
export const SetContentType = new Set([
  ContentTypes.JSON,
  ContentTypes.FORM_DATA,
  ContentTypes.URLENCODED,
  ContentTypes.TEXT_PLAIN,
  ContentTypes.BUFFER,
]);
export const AcceptContentType = (...contentType: ContentTypes[]) =>
  SetMetadata(CONTENT_TYPE_KEY, new Set(contentType));
