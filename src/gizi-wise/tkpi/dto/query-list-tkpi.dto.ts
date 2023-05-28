import { QueryListDto } from '@common/dto/query-list.dto';
import { IsOptionalWithEmptyString } from '@common/validators/is-optional-with-empty-string.validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class QueryListTkpiDto extends QueryListDto {
  @ApiPropertyOptional({
    type: 'number',
  })
  @IsOptionalWithEmptyString()
  @IsNumber()
  productId: number;
}
