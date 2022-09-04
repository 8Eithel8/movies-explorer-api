const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const { secretKey, jwtSettings } = require('../utils/config');

const userNotFound = 'Запрашиваемый пользователь не найден.';
const userInvalidData = 'Переданы некорректные данные при создании пользователя.';
const userInvalidProfileData = 'Переданы некорректные данные при обновлении профиля.';
const userExists = 'Пользователь с таким логином уже зарегистрирован.';

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(userNotFound))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(userInvalidProfileData));
      } else next(err);
    });
};

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(userInvalidData));
      } if (err.code === 11000) {
        next(new ConflictError(userExists));
      } else {
        next(err);
      }
    });
};

// проверяем почту и пароль пользователя
module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secretKey,
        jwtSettings,
      );
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

// обновляем инфо о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(userNotFound))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(userInvalidProfileData));
      } if (err.code === 11000) {
        next(new ConflictError(userExists));
      } else {
        next(err);
      }
    });
};
