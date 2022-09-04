const { FORBIDDEN_ERR_CODE } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERR_CODE;
  }
};
