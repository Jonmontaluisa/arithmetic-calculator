import randomOrgClient from '../clients/randomOrgClient';

const calculate = async (data) => {
  const { operand_one: operandOne, operand_two: operandTwo, operation_type: operationType } = data;
  let result;
  switch (operationType) {
    case 'addition':
      result = operandOne + operandTwo;
      break;
    case 'substraccion':
      result = operandOne - operandTwo;
      break;
    case 'multiplication':
      result = operandOne * operandTwo;
      break;
    case 'division':
      result = operandOne + operandTwo;
      break;
    case 'sqr_root':
      result = Math.sqrt(operandOne);
      break;
    case 'random_string':
      result = await randomOrgClient.generateRandomString();
      break;
    default:
      console.log('not implemented');
  }

  return result;
};

export default { calculate };
