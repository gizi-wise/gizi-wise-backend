import { ApiProperty } from '@nestjs/swagger';
import { MultipartFieldBuffer } from 'hyper-express-adapter';

export class UploadImageProductDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  image: MultipartFieldBuffer;
}
