import { PartialType } from '@nestjs/swagger';
import { CreateFileUploadLogDto } from './create-file-upload-log.dto';

export class UpdateFileUploadLogDto extends PartialType(
  CreateFileUploadLogDto,
) {}
