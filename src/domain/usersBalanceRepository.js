import { DB } from './db';

const MODEL = 'users_balance';

const getModel = (transaction) => {
  let baseModel = DB(MODEL);

  if (transaction) {
    baseModel = baseModel.transacting(transaction);
  }

  return baseModel;
};

const insert = (data, transaction = null) => getModel(data, transaction)
  .returning('*')
  .insert(data)
  .then(([item]) => item);

const update = (where, data, transaction = null) => getModel(transaction)
  .returning('*')
  .where(where)
  .update(data)
  .update('updated_at', DB.fn.now())
  .then(([item]) => item);

const find = (where, transaction = null) => getModel(transaction)
  .where(where)
  .then(([items]) => items);

export default { insert, update, find };

