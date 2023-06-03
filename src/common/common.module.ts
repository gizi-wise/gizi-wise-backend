import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { UtilitiesModule } from './utilities/utilities.module';
import { CloudStorageService } from './cloud-storage/cloud-storage.service';

@Global()
@Module({
  imports: [UtilitiesModule],
  providers: [FirebaseService, CloudStorageService],
  exports: [FirebaseService, UtilitiesModule, CloudStorageService],
})
export class CommonModule {}
