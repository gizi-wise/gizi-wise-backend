import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ProductType } from '../entities/product.entity';

export class QueryListProductDto {
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

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @Min(1)
  page: number;

  @ApiProperty({
    type: 'number',
    example: 10,
  })
  @Min(1)
  limit: number;

  offset: number;
}
