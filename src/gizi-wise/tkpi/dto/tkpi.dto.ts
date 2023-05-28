import { validateAndTransformData } from '@common/functions/validateAndTransformData';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ProductDto } from '@gizi-wise/product/dto/product.dto';

import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tkpi } from '../entities/tkpi.entity';

export class TkpiDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsOptionalWithEmptyString()
  @Type(() => ProductDto)
  product: ProductDto;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptionalWithEmptyString()
  @IsString()
  unit: string;

  constructor(data: Tkpi, omit: string[] = []) {
    validateAndTransformData.call(this, data, omit);
  }
}
