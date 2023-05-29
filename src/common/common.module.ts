import { Global, Module } from '@nestjs/common';
import { UuidService } from './uuid/uuid.service';
import { HashService } from './hash/hash.service';
import { FirebaseService } from './firebase/firebase.service';

@Global()
@Module({
  providers: [UuidService, HashService, FirebaseService],
  exports: [UuidService, HashService, FirebaseService],
})
export class CommonModule {}
