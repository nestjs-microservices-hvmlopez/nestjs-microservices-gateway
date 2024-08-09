import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_MICROSERVICE_HOST: string;
  PRODUCT_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
    PRODUCT_MICROSERVICE_HOST: joi.string().required(),
    PRODUCT_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  PRODUCT_MICROSERVICE_HOST: envVars.PRODUCT_MICROSERVICE_HOST,
  PRODUCT_MICROSERVICE_PORT: envVars.PRODUCT_MICROSERVICE_PORT,
  ORDERS_MICROSERVICE_HOST: envVars.ORDERS_MICROSERVICE_HOST,
  ORDERS_MICROSERVICE_PORT: envVars.ORDERS_MICROSERVICE_PORT,
};
