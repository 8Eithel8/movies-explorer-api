const Movies = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const movieInvalidData = 'Переданы некорректные данные при создании фильма.';
const movieNonexistentId = 'Передан несуществующий _id.';
const forbidden = 'Действие запрещено.';

const movieDeleteMsg = 'Фильм удалён';

// получаем все карточки
module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаем карточку
module.exports.createMovie = (req, res, next) => {
  req.body.owner = req.user._id; // достанем  ID

  Movies.create(req.body)
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(movieInvalidData));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params._id)
    .orFail()
    .then(
      (movie) => {
        const me = req.user._id;
        if (me === movie.owner.toString()) {
          return movie.remove().then(() => res.status(200).send({ message: movieDeleteMsg }));
        }
        throw new ForbiddenError(forbidden);
      },
    ).catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(movieNonexistentId));
      } else
      if (err.name === 'CastError') {
        next(new BadRequestError(movieNonexistentId));
      } else {
        next(err);
      }
    });
};
