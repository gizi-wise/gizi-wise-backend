import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductType } from '../entities/product.entity';

export class CreateProductDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'GP001',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  code?: string;

  @ApiProperty({
    type: 'string',
    example: 'Semangka Kuning',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  latinName?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  origin?: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    type: 'string',
    enum: ['raw', 'processed'],
  })
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    type: 'number',
  })
  @IsOptionalWithEmptyString()
  @IsNumber()
  servingSize?: number;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  servingUnit?: string;

  @ApiPropertyOptional({
    type: 'number',
  })
  @IsOptionalWithEmptyString()
  @IsNumber()
  ediblePortion?: number;
}
