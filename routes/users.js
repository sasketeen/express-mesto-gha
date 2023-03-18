const router = require('express').Router();
const {
  getMe, getUserInfo, getUsers, editUserInfo, editAvatar,
} = require('../controllers/users');
const { doesUserExist } = require('../middlewares/user');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', editUserInfo);
router.patch('/me/avatar', editAvatar);
router.use('/:userId', doesUserExist);
router.get('/:userId', getUserInfo);

module.exports = router;
