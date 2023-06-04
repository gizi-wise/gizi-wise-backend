import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'file_upload_logs',
  timestamps: true,
  paranoid: true,
})
export class FileUploadLog extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Unique
  @Column
  url: string;

  @Column
  contentType: string;

  @Column
  extension: string;

  @Column
  moduleName: string;

  @Column
  isDeleted: boolean;

  @Column
  ownerId: string;

  @Column
  ownerRole: string;
}
