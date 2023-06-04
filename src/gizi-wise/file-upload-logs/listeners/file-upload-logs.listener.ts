import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateFileUploadLogDto } from '../dto/create-file-upload-log.dto';
import { FileUploadLogsService } from '../file-upload-logs.service';

@Injectable()
export class FileUploadLogsListener {
  private readonly logger = new Logger('FileUploadLogsListener');
  constructor(private readonly fileUploadLogsService: FileUploadLogsService) {}
  @OnEvent('file.uploaded')
  async handleFileUploadEvent(event: CreateFileUploadLogDto) {
    try {
      const createLog = await this.fileUploadLogsService.create(event);
      return createLog;
    } catch (error) {
      console.log(error);
      this.logger.error(error.message, error.stack);
    }
  }

  @OnEvent('file.deleted')
  async handleFileDeleteEvent(event: CreateFileUploadLogDto) {
    try {
      const { url } = event;
      const updateLog = await this.fileUploadLogsService.updateByUrl(url, {
        isDeleted: true,
      });
      return updateLog;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
