import * as Joi from 'joi';

export const environtments = {
  prod: 'prod.env',
  default: '.env',
};

export const schema = Joi.object({
  MYSQL_DB: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
});
