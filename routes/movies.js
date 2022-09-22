const router = require('express').Router();
const { validateMovie, validateId } = require('../middlewares/validators');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.route('/')
  .get(getMovies)
  .post(validateMovie, createMovie);

router.delete('/:_id', validateId, deleteMovie);

module.exports = router;
