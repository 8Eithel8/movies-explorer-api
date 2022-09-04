// схема пользователя:
const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');

const userInvalidLoginOrPass = 'Неверный логин или пароль.';

const userSchema = new Schema({

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

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

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

module.exports = model('user', userSchema);
