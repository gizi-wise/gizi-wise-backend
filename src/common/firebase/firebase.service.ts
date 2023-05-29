import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { App } from 'firebase-admin/app';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger('Firebase');
  private readonly firebaseApp: App;
  constructor(private configService: ConfigService) {
    this.firebaseApp = firebase.initializeApp();
    if (firebase.apps.length) {
      this.logger.log('Firebase App has initialized');
    }
  }
  getApp(): App {
    return this.firebaseApp;
  }
}
