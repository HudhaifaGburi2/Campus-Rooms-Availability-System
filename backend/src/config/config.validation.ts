import * as Joi from 'joi';

export const configValidation = Joi.object({
  // Database
  DATABASE_URL: Joi.string().required(),

  // Application
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  API_VERSION: Joi.string().default('v1'),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('7d'),

  // CORS
  CORS_ORIGIN: Joi.string().default('http://localhost:3001'),

  // File Upload
  MAX_FILE_SIZE: Joi.number().default(10485760), // 10MB
  UPLOAD_PATH: Joi.string().default('./uploads'),

  // Rate Limiting
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(100),
});
