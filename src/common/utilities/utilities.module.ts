import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { UuidService } from './uuid/uuid.service';

@Module({
  providers: [UuidService, HashService],
  exports: [UuidService, HashService],
})
export class UtilitiesModule {}
