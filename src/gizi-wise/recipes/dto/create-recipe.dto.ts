import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    type: 'boolean',
  })
  @IsOptionalWithEmptyString()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  ingredients: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  instructions: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  tips?: string;

  @ApiHideProperty()
  authorId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'number',
    },
  })
  @IsArray()
  @IsNumber({}, { each: true })
  recipeTags: number[];
}
