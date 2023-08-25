import { ENVIRONMENTS } from '../constants';

const defaultPort = 3000;
const generateConfig = () => {
  const missingKeys = [];

  const getEnvVar = (key, defaultValue) => {
    if (!process.env[key] && defaultValue === undefined) {
      missingKeys.push(key);
    }

    return (process.env[key] || defaultValue);
  };
  const environment = getEnvVar('NODE_ENV', ENVIRONMENTS.LOCAL);

  const config = {
    environment,
    port: getEnvVar('PORT', defaultPort),
    database: {
      connection: {
        port: Number(getEnvVar('DB_PORT', '5432')),
        host: getEnvVar('DB_HOSTNAME'),
        user: getEnvVar('DB_USERNAME'),
        password: getEnvVar('DB_PASSWORD'),
        database: getEnvVar('DB_NAME'),
        ssl: false,
      },
      pool: {
        min: Number(getEnvVar('DB_MIN_POOL', '0')),
        max: Number(getEnvVar('DB_MAX_POOL', '10')),
      },
      acquireConnectionTimeout: Number(getEnvVar('DB_CONNECTION_TIMEOUT', '10000')),
    },
  };

  return config;
};

export default generateConfig();
