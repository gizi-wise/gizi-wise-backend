import { ApiProperty } from '@nestjs/swagger';
import { MultipartFieldBuffer } from 'hyper-express-adapter';

export class UploadImageAdminDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  image: MultipartFieldBuffer;
}
