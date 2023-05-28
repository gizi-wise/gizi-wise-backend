import { PartialType } from '@nestjs/swagger';
import { CreateTkpiDto } from './create-tkpi.dto';

export class UpdateTkpiDto extends PartialType(CreateTkpiDto) {}
