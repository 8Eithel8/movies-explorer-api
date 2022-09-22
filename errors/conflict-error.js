const { CONFLICT_ERR_CODE } = require('../utils/constants');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERR_CODE;
  }
};
