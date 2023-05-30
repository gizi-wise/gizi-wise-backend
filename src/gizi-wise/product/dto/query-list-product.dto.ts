import { QueryListDto } from '@common/dto/query-list.dto';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductType } from '../entities/product.entity';

export class QueryListProductDto extends QueryListDto {
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: 'number',
  })
  @IsOptionalWithEmptyString()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    type: 'string',
    enum: ['raw', 'processed'],
  })
  @IsOptionalWithEmptyString()
  @IsEnum(ProductType)
  type?: ProductType;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    type: 'boolean',
  })
  @IsOptionalWithEmptyString()
  @IsBoolean()
  showDetail?: boolean;
}
