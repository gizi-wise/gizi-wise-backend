import { ConfigModuleOptions } from '@nestjs/config';
import { validate } from './env.validation';

const envConfig: ConfigModuleOptions = {
  validate,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  expandVariables: true,
  isGlobal: true,
  cache: true,
};
export default envConfig;
