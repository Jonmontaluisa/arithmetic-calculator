import { StatusCodes } from 'http-status-codes';

class BaseError extends Error {
  // eslint-disable-next-line default-param-last
  constructor(code, cause = '', status = StatusCodes.INTERNAL_SERVER_ERROR, metadata = null) {
    super(cause);
    this.error = {
      code,
      status,
      cause,
      message: cause,
      metadata,
    };
  }
}

export default BaseError;
