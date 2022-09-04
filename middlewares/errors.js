const { SERVER_ERR_CODE, SERVER_ERR_MSG } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = SERVER_ERR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === SERVER_ERR_CODE
        ? SERVER_ERR_MSG
        : message,
    });
  next();
};
