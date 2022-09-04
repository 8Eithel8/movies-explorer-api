const { UNAUTH_ERR_CODE } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_ERR_CODE;
  }
};
