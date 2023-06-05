import { ApiProperty } from '@nestjs/swagger';
import { MultipartFieldBuffer } from 'hyper-express-adapter';

export class UploadImageArticleDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  image: MultipartFieldBuffer;
}
