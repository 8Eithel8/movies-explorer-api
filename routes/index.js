const router = require('express').Router();

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { validateUser, validateLogin } = require('../middlewares/validators');
const { signin, createUser } = require('../controllers/user');

router.get('/', (req, res) => res.send({ message: 'Добро пожаловать в REST API приложения Movies' }));

router.post('/signin', validateLogin, signin);
router.post('/signup', validateUser, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(() => {
  throw new NotFoundError('Путь не найден');
});

module.exports = router;
