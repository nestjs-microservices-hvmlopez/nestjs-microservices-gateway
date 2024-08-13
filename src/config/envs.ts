import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  NATS_SERVERS: string[];
}

const envSchema = joi
  .object({
    PORT: joi.number().default(3000),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS
    ? process.env.NATS_SERVERS.split(',')
    : ['nats://localhost:4222'],
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  NATS_SERVERS: envVars.NATS_SERVERS,
};
