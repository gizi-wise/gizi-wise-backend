import { Injectable, Logger } from '@nestjs/common';
import { Bucket, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateFileUploadLogDto } from '@gizi-wise/file-upload-logs/dto/create-file-upload-log.dto';

@Injectable()
export class CloudStorageService {
  private readonly logger = new Logger('CloudStorage');
  private readonly storageApp: Storage;
  private readonly bucketName: string;
  private readonly bucket: Bucket;
  private readonly baseUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.storageApp = new Storage({
      credentials: JSON.parse(this.configService.get('CLOUD_STORAGE_CONFIG')),
    });
    this.bucketName = this.configService.get('CLOUD_STORAGE_BUCKET');
    this.bucket = this.storageApp.bucket(this.bucketName);
    this.baseUrl = `https://storage.googleapis.com/${this.bucketName}`;
    this.logger.log('Cloud Storage App has initialized');
  }

  async uploadFile(data: CreateFileParams) {
    try {
      const url = `${this.baseUrl}/${data.destination}`;
      const extension = data.destination.split('.').pop();
      if (data.contentType.includes('image/*')) {
        data.contentType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;
      }
      await this.bucket.file(data.destination).save(data.file, {
        public: true,
        validation: false,
        uri: url,
      });
      await this.bucket.file(data.destination).setMetadata({
        contentType: data.contentType,
        customTime: new Date(),
        cacheControl: 'public, max-age=31536000',
      });
      const fileUploadDto: CreateFileUploadLogDto = {
        isDeleted: false,
        moduleName: data.moduleName,
        ownerId: data.uploader.id,
        ownerRole: data.uploader.role,
        url,
        contentType: data.contentType,
        extension,
      };
      this.eventEmitter.emit('file.uploaded', fileUploadDto);
      return url;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async deleteFile(url: string) {
    try {
      if (!url.includes(this.baseUrl)) {
        return false;
      }
      const [response] = await this.bucket
        .file(url.replace(`${this.baseUrl}/`, ''))
        .delete({ ignoreNotFound: true });
      if ((response as any).error) {
        this.logger.error((response as any).error.message);
        return false;
      }
      this.eventEmitter.emit('file.deleted', { url });
      return true;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}

export interface CreateFileParams {
  destination: string;
  contentType: string;
  file: Buffer;
  uploader: {
    id: string;
    role: string;
  };
  moduleName: string;
}
