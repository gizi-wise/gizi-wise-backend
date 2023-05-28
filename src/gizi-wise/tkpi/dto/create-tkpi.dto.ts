import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTkpiDto {
  @ApiProperty({
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    type: 'string',
    example: 'Air',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'Water',
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiPropertyOptional({
    type: 'number',
  })
  @IsOptionalWithEmptyString()
  @IsNumber()
  value: number;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  unit: string;
}
