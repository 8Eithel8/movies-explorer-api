const { SERVER_ERR_CODE } = require('../utils/constants');

module.exports = class InternalSeverError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERR_CODE;
  }
};
