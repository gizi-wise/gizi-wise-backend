import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { App } from 'firebase-admin/app';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger('Firebase');
  private readonly firebaseApp: App;
  constructor(private configService: ConfigService) {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(
        JSON.parse(this.configService.get('FIREBASE_CONFIG')),
      ),
    });
    if (firebase.apps.length) {
      this.logger.log('Firebase App has initialized');
    }
  }
  async verifyIdToken(idToken: string): Promise<firebase.auth.DecodedIdToken> {
    try {
      const decodedToken = await firebase
        .auth(this.firebaseApp)
        .verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new BadRequestException('Please check your token');
    }
  }
}
