import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    example: 'Sayuran',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'Sayuran dan tumbuh-tumbuhan lainnya',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'https://example.com/image.png',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  image: string;
}
