import path from 'path';
import config from './src/config/index';
import { ENVIRONMENTS } from './src/constants';

const defaultDbConfig = {
  ...config.database,
  client: 'postgres',
  migrations: {
    table_name: 'knex_migrations',
    directory: path.resolve(__dirname, './src/migrations'),
  },
  seeds: { directory: 'src/database/seeds' },
};

const knex = {
  [ENVIRONMENTS.LOCAL]: {
    ...defaultDbConfig,
    asyncStackTraces: true,
    debug: true,
  },
  [ENVIRONMENTS.DEVELOPMENT]: {
    ...defaultDbConfig,
    asyncStackTraces: true,
    debug: true,
  },
};

export default knex;
