import { DB } from './db';

const MODEL = 'users';

const getModel = (transaction) => {
  let baseModel = DB(MODEL);

  if (transaction) {
    baseModel = baseModel.transacting(transaction);
  }

  return baseModel;
};

const findAll = (where, transaction = null) => getModel(transaction)
  .select('*');

const find = (where, transaction = null) => getModel(transaction)
  .where(where)
  .then(([items]) => items);

const insert = (data, transaction = null) => getModel(data, transaction)
  .returning('*')
  .insert(data)
  .then(([item]) => item);

export default {
  findAll,
  find,
  insert,
};
