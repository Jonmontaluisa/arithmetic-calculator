import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import request from 'supertest';
import app from '../src/app';
import usersBalanceRepository from '../src/domain/usersBalanceRepository';
import operationsRepository from '../src/domain/operationsRepository';
import randomOrgClient from '../src/clients/randomOrgClient';
import recordsRepository from '../src/domain/recordsRepository';

const userId = '402097fb-595e-49b7-a019-4f96afc3319f';
const operationId = '78efd2d3-27e2-40c3-9ae0-6949e131872d';

describe('operations Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should succeed', async () => {
    const spiedUserBalanceRepository = jest
      .spyOn(usersBalanceRepository, 'find')
      .mockImplementation(() => Promise.resolve({ id: userId, balance: 1000 }));
    const spiedOperationsRepository = jest
      .spyOn(operationsRepository, 'find')
      .mockImplementation(() => Promise.resolve({ id: operationId, type: 'random_string', cost: 10 }));
    const spiedAxios = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'random String XD' }));
    const spiedRecordsRepository = jest
      .spyOn(recordsRepository, 'insert')
      .mockImplementation(() => Promise.resolve(''));
    const spiedUsersBalanceRepository = jest
      .spyOn(usersBalanceRepository, 'update')
      .mockImplementation(() => Promise.resolve(''));
    const resp = await request(app)
      .get('/request-operation')
      .set({ user_id: '402097fb-595e-49b7-a019-4f96afc3319f' })
      .send({ operation_type: 'random_string' });

    expect(resp.status).toBe(StatusCodes.OK);
    expect(resp.body).toStrictEqual({ response: 'random String XD' });
    expect(spiedUserBalanceRepository).toHaveBeenCalledTimes(1);
    expect(spiedOperationsRepository).toHaveBeenCalledTimes(1);
    expect(spiedAxios).toHaveBeenCalledTimes(1);
    expect(spiedRecordsRepository).toHaveBeenCalledTimes(1);
    expect(spiedUsersBalanceRepository).toHaveBeenCalledTimes(1);
  });
  it('should succeed', async () => {
    const spiedUserBalanceRepository = jest
      .spyOn(usersBalanceRepository, 'find')
      .mockImplementation(() => Promise.resolve({ id: userId, balance: 1 }));
    const spiedOperationsRepository = jest
      .spyOn(operationsRepository, 'find')
      .mockImplementation(() => Promise.resolve({ id: operationId, type: 'random_string', cost: 10 }));
    const resp = await request(app)
      .get('/request-operation')
      .set({ user_id: '402097fb-595e-49b7-a019-4f96afc3319f' })
      .send({ operation_type: 'random_string' });

    expect(resp.status).toBe(StatusCodes.BAD_REQUEST);
    expect(resp.body.error.code).toBe('NOT_ENOUGH_FUNDS');
    expect(spiedUserBalanceRepository).toHaveBeenCalledTimes(1);
    expect(spiedOperationsRepository).toHaveBeenCalledTimes(1);
  });
});
