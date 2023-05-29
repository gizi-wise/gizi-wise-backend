import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { UtilitiesModule } from './utilities/utilities.module';

@Global()
@Module({
  imports: [UtilitiesModule],
  providers: [FirebaseService],
  exports: [FirebaseService, UtilitiesModule],
})
export class CommonModule {}
