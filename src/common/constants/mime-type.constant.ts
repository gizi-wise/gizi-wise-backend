export const mimeTypeList = {
  image: new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/*',
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
