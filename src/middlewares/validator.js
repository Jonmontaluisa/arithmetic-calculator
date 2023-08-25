import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';
import BaseError from '../common/baseError';

const ajv = new Ajv();
const schemaOperation = {
  type: 'object',
  oneOf: [
    {
      properties: {
        operand_one: { type: 'number' },
        operand_two: { type: 'number' },
        operation_type: { type: 'string', enum: ['addition', 'substraction', 'multiplication', 'division'] },
      },
      required: ['operand_one', 'operand_two', 'operation_type'],
    },
    {
      properties: {
        operand_one: { type: 'number' },
        operation_type: { type: 'string', enum: ['sqr_root'] },
      },
      required: ['operation_type', 'operand_one'],
    },
    {
      properties: { operation_type: { type: 'string', enum: ['random_string'] } },
      required: ['operation_type'],
    },
  ],
};

const validateOperationsSchema = (req, res, next) => {
  const validate = ajv.compile(schemaOperation);
  const valid = validate(req.body);
  if (!valid) {
    throw new BaseError('invalid schema', 'INVALID_SCHEMA', '', StatusCodes.NOT_ACCEPTABLE, validate.errors);
  }
  next();
};

export default { validateOperationsSchema };
