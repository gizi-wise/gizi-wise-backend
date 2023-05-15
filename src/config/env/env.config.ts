import envSchema from './env.schema';

const envConfig = {
  validationSchema: envSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  expandVariables: true,
  isGlobal: true,
  cache: true,
};
export default envConfig;
