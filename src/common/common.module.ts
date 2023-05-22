import { Global, Module } from '@nestjs/common';
import { UuidService } from './uuid/uuid.service';
import { HashService } from './hash/hash.service';

@Global()
@Module({
  providers: [UuidService, HashService],
  exports: [UuidService, HashService],
})
export class CommonModule {}
