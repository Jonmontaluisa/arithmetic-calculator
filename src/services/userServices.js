import { DB } from '../domain/db';
import usersRepository from '../domain/usersRepository';
import usersBalanceRepository from '../domain/usersBalanceRepository';

const getUsers = () => usersRepository.findAll();
const createUser = async (data) => {
  let user = {};
  await DB.transaction(async (trx) => {
    try {
      user = await usersRepository.insert(data, trx);
      await usersBalanceRepository.insert({ id: user.id, balance: 100 });
      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  });

  return user;
};

export default {
  getUsers,
  createUser,
};
