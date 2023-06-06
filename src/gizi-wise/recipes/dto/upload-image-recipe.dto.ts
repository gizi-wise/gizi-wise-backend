import { ApiProperty } from '@nestjs/swagger';
import { MultipartFieldBuffer } from 'hyper-express-adapter';

export class UploadImageRecipeDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  image: MultipartFieldBuffer;
}
