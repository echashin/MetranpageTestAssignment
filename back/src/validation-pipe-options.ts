import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export const validationPipeOptions: ValidationPipeOptions = {
  skipMissingProperties: true,
  skipNullProperties: false,
  skipUndefinedProperties: true,
  validateCustomDecorators: true,
  whitelist: true,
  transform: false,
  transformOptions: {
    enableImplicitConversion: true,
    exposeUnsetFields: false,
  },
};
