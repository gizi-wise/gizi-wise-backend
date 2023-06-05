import { QueryListDto } from '@common/dto/query-list.dto';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class QueryListArticleDto extends QueryListDto {
  @ApiPropertyOptional({
    type: 'boolean',
  })
  @IsOptionalWithEmptyString()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  articleTags?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsUUID()
  authorId?: string;
}
