import knex from 'knex';
import knexfile from '../../knexfile';
import config from '../config';

export const DB = knex(knexfile[config.environment]);
