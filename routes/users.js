const router = require('express').Router();
const { validateUserInfo } = require('../middlewares/validators');

const {
  getUserMe, updateUserInfo,
} = require('../controllers/user');

router.route('/me')
  .get(getUserMe)
  .patch(validateUserInfo, updateUserInfo);

module.exports = router;
