const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');
const { validateUser, validateLogin } = require('../middlewares/validators');
const { signin, createUser } = require('../controllers/user');
const { NOT_FOUND_ERR_MSG, HELLO_MSG } = require('../utils/constants');

router.get('/', (req, res) => res.send({ message: HELLO_MSG }));

router.post('/signin', validateLogin, signin);
router.post('/signup', validateUser, createUser);

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(() => {
  throw new NotFoundError(NOT_FOUND_ERR_MSG);
});

module.exports = router;
