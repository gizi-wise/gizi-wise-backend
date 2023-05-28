import { InternalServerErrorException } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { Model } from 'sequelize-typescript';

export function validateAndTransformData(data: any, omit: string[] = []) {
  Object.assign(this, data instanceof Model ? data.toJSON() : data);
  const errors = validateSync(this, {
    validationError: { target: true },
    whitelist: true,
  });
  if (errors.length > 0) {
    throw new InternalServerErrorException(errors);
  }

  if (omit.length) {
    omit.forEach((key) => delete this[key]);
  }

  Object.keys(this).forEach((key) => {
    if (this[key] === '') {
      this[key] = null;
    }
  });
}
