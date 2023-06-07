import { mimeTypeList } from '@common/constants/mime-type.constant';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { CreateFileUploadLogDto } from './dto/create-file-upload-log.dto';
import { FileUploadLogDto } from './dto/file-upload-log.dto';
import { QueryListFileUploadLogDto } from './dto/query-list-file-upload-log.dto';
import { UpdateFileUploadLogDto } from './dto/update-file-upload-log.dto';
import { FileUploadLog } from './entities/file-upload-log.entity';

@Injectable()
export class FileUploadLogsService {
  private readonly errorMessages = {
    notFound: 'File is not found in log',
  };
  constructor(
    @InjectModel(FileUploadLog)
    private readonly fileUploadLogModel: typeof FileUploadLog,
  ) {}
  async create(createFileUploadLogDto: CreateFileUploadLogDto) {
    try {
      const fileUploadLog = await this.fileUploadLogModel.create({
        ...createFileUploadLogDto,
      });
      return new FileUploadLogDto(fileUploadLog);
    } catch (error) {
      throw error;
    }
  }

  async findAll(queryListFileUploadLogDto: QueryListFileUploadLogDto) {
    const {
      limit,
      offset,
      order,
      sort,
      isDeleted,
      moduleName,
      ownerRole,
      contentType,
      extension,
    } = queryListFileUploadLogDto;
    try {
      const whereOptions: WhereOptions = {};
      if (isDeleted) {
        whereOptions['isDeleted'] = isDeleted;
      }
      if (moduleName) {
        whereOptions['moduleName'] = moduleName;
      }
      if (ownerRole) {
        whereOptions['ownerRole'] = ownerRole;
      }
      if (contentType) {
        const getSetOfContentType: Set<string> = mimeTypeList[contentType];
        whereOptions['contentType'] =
          getSetOfContentType.size > 0
            ? {
                [Op.in]: [...getSetOfContentType],
              }
            : contentType;
      }
      if (extension) {
        whereOptions['extension'] = extension;
      }
      const { rows, count } = await this.fileUploadLogModel.findAndCountAll({
        where: whereOptions,
        attributes: {
          exclude: ['createdAt', 'deletedAt', 'updatedAt'],
        },
        limit,
        offset,
        order: [[sort, order]],
        distinct: true,
      });
      return {
        categories: rows.map(
          (fileUploadLog) => new FileUploadLogDto(fileUploadLog),
        ),
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const fileUploadLog = await this.fileUploadLogModel.findByPk(id);
      if (!fileUploadLog) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return new FileUploadLogDto(fileUploadLog);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateFileUploadLogDto: UpdateFileUploadLogDto) {
    try {
      const [affectedCount] = await this.fileUploadLogModel.update(
        updateFileUploadLogDto,
        {
          where: {
            id,
          },
        },
      );
      if (affectedCount === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async updateByUrl(
    url: string,
    updateFileUploadLogDto: UpdateFileUploadLogDto,
  ) {
    try {
      const [affectedCount] = await this.fileUploadLogModel.update(
        updateFileUploadLogDto,
        {
          where: {
            url,
          },
        },
      );
      return affectedCount !== 0;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.fileUploadLogModel.destroy({
        where: {
          id,
        },
      });
      if (deleted === 0) {
        throw new NotFoundException(this.errorMessages.notFound);
      }
      return 'File upload log is deleted';
    } catch (error) {
      throw error;
    }
  }
}
