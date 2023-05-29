import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
})
export class User extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  role: string;

  @Column
  image?: string;

  @Column
  birthday?: Date;

  @Column
  weight?: number;

  @Column
  height?: number;
}
