import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'admins',
  paranoid: true,
  indexes: [
    {
      fields: ['username'],
      unique: true,
    },
    {
      fields: ['email'],
      unique: true,
    },
  ],
})
export class Admin extends Model {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  username: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  image?: string;

  @Column
  role: AdminRole;

  @Column
  isActive: boolean;
}

export enum AdminRole {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
}
