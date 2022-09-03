// схема пользователя:
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail, isURL } = require('validator');
// const UnauthorizedError = require('../errors/unauthorized-error');

const userInvalidLoginOrPass = 'Неверный логин или пароль.';

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
    },
  },
// TODO Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Александр',
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(userInvalidLoginOrPass));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(userInvalidLoginOrPass));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
