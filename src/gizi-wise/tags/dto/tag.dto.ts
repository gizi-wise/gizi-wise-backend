import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { IsNumber } from 'class-validator';
import { Tag } from '../entities/tag.entity';
import { CreateTagDto } from './create-tag.dto';

export class TagDto extends CreateTagDto {
  @IsOptionalWithEmptyString()
  @IsNumber()
  id?: number;

  constructor(data: Tag, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
