import operationsRepository from '../domain/operationsRepository';

const getOperations = () => operationsRepository.findAll();

const createOperation = (data) => operationsRepository.insert(data);

export default {
  getOperations,
  createOperation,
};
