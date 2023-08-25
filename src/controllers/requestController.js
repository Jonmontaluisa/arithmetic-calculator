import requestsService from '../services/requestsService';

const fulfillRequest = async (req, res, next) => {
  let operationResponse;
  try {
    operationResponse = await requestsService.fulfillRequest(req.headers.user_id, req.body);
    res.json(operationResponse);
  } catch (err) {
    next(err);
  }
};

export default { fulfillRequest };
