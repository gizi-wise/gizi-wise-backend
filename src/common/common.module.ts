import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { UtilitiesModule } from './utilities/utilities.module';
import { CloudStorageService } from './cloud-storage/cloud-storage.service';
import { ImagePredictionService } from './image-prediction/image-prediction.service';

@Global()
@Module({
  imports: [UtilitiesModule],
  providers: [FirebaseService, CloudStorageService, ImagePredictionService],
  exports: [
    FirebaseService,
    UtilitiesModule,
    CloudStorageService,
    ImagePredictionService,
  ],
})
export class CommonModule {}
