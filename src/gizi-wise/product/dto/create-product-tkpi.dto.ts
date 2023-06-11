import { CreateTkpiDto } from '@gizi-wise/tkpi/dto/create-tkpi.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateProductTKPIDto extends OmitType(CreateTkpiDto, [
  'productId',
]) {}
