import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { Type } from 'class-transformer';
import { Allow, IsNumberString } from 'class-validator';
import { FileUploadLog } from '../entities/file-upload-log.entity';
import { CreateFileUploadLogDto } from './create-file-upload-log.dto';

export class FileUploadLogDto extends CreateFileUploadLogDto {
  @IsOptionalWithEmptyString()
  @IsNumberString()
  id?: bigint;

  @IsOptionalWithEmptyString()
  @Allow()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptionalWithEmptyString()
  @Allow()
  @Type(() => Date)
  updatedAt?: Date;

  constructor(data: FileUploadLog, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
