import { Injectable, Logger } from '@nestjs/common';
import { Bucket, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudStorageService {
  private readonly logger = new Logger('CloudStorage');
  private readonly storageApp: Storage;
  private readonly bucketName: string;
  private readonly bucket: Bucket;
  constructor(private configService: ConfigService) {
    this.storageApp = new Storage({
      credentials: JSON.parse(this.configService.get('CLOUD_STORAGE_CONFIG')),
    });
    this.bucketName = this.configService.get('CLOUD_STORAGE_BUCKET');
    this.bucket = this.storageApp.bucket(this.bucketName);
    this.logger.log('Cloud Storage App has initialized');
  }

  async uploadFile(destination: string, contentType: string, file: Buffer) {
    try {
      const uri = `https://storage.googleapis.com/${this.bucketName}/${destination}`;
      await this.bucket.file(destination).save(file, {
        public: true,
        validation: false,
        uri,
      });
      await this.bucket.file(destination).setMetadata({
        contentType,
        customTime: new Date(),
        cacheControl: 'public, max-age=31536000',
      });
      return uri;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async deleteFile(destination: string) {
    try {
      const [response] = await this.bucket
        .file(destination)
        .delete({ ignoreNotFound: true });
      if ((response as any).error) {
        this.logger.error((response as any).error.message);
        return (response as any).error.message;
      }
      return 'success delete file';
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
