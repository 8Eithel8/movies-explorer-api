const BAD_REQ_ERR_CODE = 400;
const UNAUTH_ERR_CODE = 401;
const FORBIDDEN_ERR_CODE = 403;
const NOT_FOUND_ERR_CODE = 404;
const CONFLICT_ERR_CODE = 409;
const SERVER_ERR_CODE = 500;

const AUTH_ERR_MSG = 'Необходима авторизация';
const SERVER_ERR_MSG = 'На сервере произошла ошибка';
const BAD_REQ_ERR_MSG = 'Некорректно задан url-адрес.';
const LOGIN_ERR_MSG = 'Неверный логин или пароль.';
const NOT_FOUND_ERR_MSG = 'Путь не найден.';

const USER_NOT_FOUND_ERR_MSG = 'Запрашиваемый пользователь не найден.';
const USER_INVALID_ERR_MSG = 'Переданы некорректные данные при создании пользователя.';
const USER_PROFILE_DATA_ERR_MSG = 'Переданы некорректные данные при обновлении профиля.';
const USER_EXISTS_ERR_MSG = 'Пользователь с таким логином уже зарегистрирован.';

const MOVIE_INVALID_ERR_MSG = 'Переданы некорректные данные при создании фильма.';
const NON_EXISTS_ID_ERR_MSG = 'Передан несуществующий _id.';
const FORBIDDEN_ERR_MSG = 'Действие запрещено.';

const MOVIE_DELETE_MSG = 'Фильм удалён';
const HELLO_MSG = 'Добро пожаловать в REST API приложения Movies';

module.exports = {
  BAD_REQ_ERR_CODE,
  UNAUTH_ERR_CODE,
  FORBIDDEN_ERR_CODE,
  NOT_FOUND_ERR_CODE,
  CONFLICT_ERR_CODE,
  SERVER_ERR_CODE,

  AUTH_ERR_MSG,
  SERVER_ERR_MSG,
  BAD_REQ_ERR_MSG,
  LOGIN_ERR_MSG,
  NOT_FOUND_ERR_MSG,

  USER_NOT_FOUND_ERR_MSG,
  USER_INVALID_ERR_MSG,
  USER_PROFILE_DATA_ERR_MSG,
  USER_EXISTS_ERR_MSG,

  MOVIE_INVALID_ERR_MSG,
  NON_EXISTS_ID_ERR_MSG,
  FORBIDDEN_ERR_MSG,

  MOVIE_DELETE_MSG,
  HELLO_MSG,
};
