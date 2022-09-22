require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { mongoDbServer, port } = require('./utils/config');

const { PORT = port, MONGO_DB_SERVER = mongoDbServer } = process.env;

const app = express();

mongoose.connect(
  MONGO_DB_SERVER,
  { useNewUrlParser: true },
);

app.use(requestLogger);
app.use(require('./middlewares/ratelimit'));

app.use(helmet());
app.use(require('./middlewares/cors'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(require('./middlewares/errors'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
