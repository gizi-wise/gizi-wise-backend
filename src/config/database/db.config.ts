import { ConfigModule } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getDatabaseConfig = async (): Promise<SequelizeModuleOptions> => {
  await ConfigModule.envVariablesLoaded;
  return {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) ?? 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadModels: true,
    synchronize: true,
    timezone: process.env.TZ,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 3600000,
    },
    logging: false,
  };
};
