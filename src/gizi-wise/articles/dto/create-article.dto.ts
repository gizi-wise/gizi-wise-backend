import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
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

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  content: string;

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
  articleTags: number[];
}
