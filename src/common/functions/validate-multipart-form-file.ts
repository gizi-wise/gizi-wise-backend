import { extensionList } from '@common/constants/file-extension.constant';
import { mimeTypeList } from '@common/constants/mime-type.constant';
import {
  PayloadTooLargeException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { MultipartFieldBuffer } from 'hyper-express-adapter';

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
