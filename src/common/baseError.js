import { StatusCodes } from 'http-status-codes';

class BaseError extends Error {
  // eslint-disable-next-line default-param-last
  constructor(type = 'BaseError', code, cause = '', status = StatusCodes.INTERNAL_SERVER_ERROR, metadata = null) {
    super(cause);
    this.error = {
      type,
      code,
      status,
      cause,
      message: cause,
      metadata,
    };
  }
}

export default BaseError;
