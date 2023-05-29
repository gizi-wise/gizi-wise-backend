import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ProductDto } from '@gizi-wise/product/dto/product.dto';

import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tkpi } from '../entities/tkpi.entity';
import { CreateTkpiDto } from './create-tkpi.dto';

export class TkpiDto extends CreateTkpiDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptionalWithEmptyString()
  @Type(() => ProductDto)
  product: ProductDto;

  @IsOptionalWithEmptyString()
  @IsString()
  unit: string;

  constructor(data: Tkpi, omit: string[] = []) {
    super();
    validateAndTransformData.call(this, data, omit);
  }
}
