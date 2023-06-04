import {
  PayloadTooLargeException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { MultipartFieldBuffer } from 'hyper-express-adapter';

const mimeTypeList = {
  image: new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
  ]),
  video: new Set(['video/mp4', 'video/webm', 'video/ogg']),
  audio: new Set(['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/webm']),
  pdf: new Set(['application/pdf']),
  doc: new Set([
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
  docx: new Set([
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
  xls: new Set([
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]),
  xlsx: new Set([
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]),
  ppt: new Set([
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ]),
  pptx: new Set([
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ]),
  zip: new Set(['application/zip', 'application/x-zip-compressed']),
  rar: new Set(['application/x-rar-compressed']),
  tar: new Set(['application/x-tar']),
  '7z': new Set(['application/x-7z-compressed']),
  txt: new Set(['text/plain']),
  csv: new Set(['text/csv']),
  rtf: new Set(['application/rtf']),
  html: new Set(['text/html']),
  xml: new Set(['text/xml']),
  json: new Set(['application/json']),
  mp3: new Set(['audio/mpeg']),
};

const extensionList = {
  image: new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']),
  video: new Set(['mp4', 'webm', 'ogg']),
  audio: new Set(['mp3', 'ogg', 'wav', 'webm']),
  pdf: new Set(['pdf']),
  doc: new Set(['doc', 'docx']),
  xls: new Set(['xls', 'xlsx']),
  ppt: new Set(['ppt', 'pptx']),
  zip: new Set(['zip']),
  rar: new Set(['rar']),
  tar: new Set(['tar']),
  '7z': new Set(['7z']),
  txt: new Set(['txt']),
  csv: new Set(['csv']),
  rtf: new Set(['rtf']),
  html: new Set(['html']),
  xml: new Set(['xml']),
  json: new Set(['json']),
};

export type MimeTypeListKey = keyof typeof mimeTypeList;

export type ExtensionListKey = keyof typeof extensionList;

export function validateMultipartFormFile(
  { file, mime_type }: MultipartFieldBuffer,
  options?: ValidateMultipartFormFileOptions,
) {
  const { maxSize, minSize, allowedMimeType, allowedExtension } = options ?? {};
  if (file) {
    const bufferLength = file.buffer?.length;
    const fileName = file.name;
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (maxSize && bufferLength > maxSize) {
      throw new PayloadTooLargeException('File size is too large');
    }

    if (minSize && bufferLength < minSize) {
      throw new UnprocessableEntityException('File size is too small');
    }

    if (allowedMimeType && !mimeTypeList[allowedMimeType].has(mime_type)) {
      throw new UnsupportedMediaTypeException(
        `File type ${mime_type} is not allowed`,
      );
    }

    if (allowedExtension && !extensionList[allowedExtension].has(extension)) {
      throw new UnsupportedMediaTypeException(
        `File extension ${extension} is not allowed`,
      );
    }
  } else {
    throw new UnprocessableEntityException('File is required');
  }
}

export interface ValidateMultipartFormFileOptions {
  maxSize?: number;
  minSize?: number;
  allowedMimeType?: MimeTypeListKey;
  allowedExtension?: ExtensionListKey;
}
