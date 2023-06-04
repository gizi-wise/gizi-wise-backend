import { Module } from '@nestjs/common';
import { FileUploadLogsService } from './file-upload-logs.service';
import { FileUploadLogsController } from './file-upload-logs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileUploadLog } from './entities/file-upload-log.entity';
import { FileUploadLogsListener } from './listeners/file-upload-logs.listener';

@Module({
  imports: [SequelizeModule.forFeature([FileUploadLog])],
  controllers: [FileUploadLogsController],
  providers: [FileUploadLogsService, FileUploadLogsListener],
  exports: [FileUploadLogsService],
})
export class FileUploadLogsModule {}
