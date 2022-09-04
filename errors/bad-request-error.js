const { BAD_REQ_ERR_CODE } = require('../utils/constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQ_ERR_CODE;
  }
};
