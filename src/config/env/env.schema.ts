import * as Joi from 'joi';
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  TZ: Joi.string().default('Asia/Jakarta'),
});
export default envSchema;
