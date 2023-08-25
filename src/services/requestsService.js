import { StatusCodes } from 'http-status-codes';
import BaseError from '../common/baseError';
import { DB } from '../domain/db';
// import usersRepository from '../domain/usersRepository';
import operationsRepository from '../domain/operationsRepository';
import recordsRepository from '../domain/recordsRepository';
import usersBalanceRepository from '../domain/usersBalanceRepository';
import calculatorService from './calculatorService';

const fulfillRequest = async (userId, data) => {
  let operationResponse;
  // eslint-disable-next-line no-useless-catch
  try {
    await DB.transaction(async (trx) => {
      const usersBalance = await usersBalanceRepository.find({ id: userId }, trx);
      const operationType = await operationsRepository.find({ type: data.operation_type }, trx);
      if (!operationType) {
        throw new BaseError('INVALID_TYPE', `type ${data.operation_type} is not present in DB`, StatusCodes.BAD_REQUEST);
      }
      if (usersBalance.balance < operationType.cost) {
        throw new BaseError('NOT_ENOUGH_FUNDS', 'there is not enough funds', StatusCodes.BAD_REQUEST);
      }
      const userBalanceAfterOperation = usersBalance.balance - operationType.cost;
      operationResponse = await calculatorService.calculate(data);
      await recordsRepository.insert({
        operation_id: operationType.id,
        user_id: userId,
        amount: operationType.cost,
        user_balance: userBalanceAfterOperation,
        operation_response: operationResponse,
      }, trx);
      await usersBalanceRepository.update({ id: userId }, { balance: userBalanceAfterOperation }, trx);
    });
  } catch (err) {
    throw err;
  }

  return operationResponse;
};

export default { fulfillRequest };
