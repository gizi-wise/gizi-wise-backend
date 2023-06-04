import { QueryListDto } from '@common/dto/query-list.dto';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class QueryListFileUploadLogDto extends QueryListDto {
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  contentType?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  extension?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  moduleName?: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptionalWithEmptyString()
  @IsString()
  ownerRole?: string;

  @ApiPropertyOptional({
    type: 'boolean',
  })
  @IsOptionalWithEmptyString()
  @IsBoolean()
  isDeleted?: boolean;
}
