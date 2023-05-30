import 'reflect-metadata';
import 'dotenv/config';
import { validate } from './env.validator';

validate(process.env);
