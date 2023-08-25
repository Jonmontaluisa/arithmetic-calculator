import { StatusCodes } from 'http-status-codes';
import operationsService from '../services/operationsService';

const getOperations = async (req, res) => {
  const operations = await operationsService.getOperations();
  res.json(operations).status(StatusCodes.OK);
};

const createOperation = async (req, res) => {
  const operation = await operationsService.createOperation(req.body);
  res.json(operation).status(StatusCodes.CREATED);
};

export default {
  getOperations,
  createOperation,
};
