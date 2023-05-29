import * as Joi from 'joi';
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  TZ: Joi.string().default('Asia/Jakarta'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_DATABASE: Joi.string().default('postgres'),
  JWT_SECRET: Joi.string().default('secret'),
  JWT_EXPIRATION_TIME: Joi.string().default('2d'),
  FIREBASE_CONFIG: Joi.string().default(''),
});
export default envSchema;
