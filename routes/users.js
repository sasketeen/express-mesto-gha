const router = require('express').Router();
const {
  postUser, doesUserExist, getUserInfo, getUsers, editUserInfo, editAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', postUser);
router.patch('/me', editUserInfo);
router.patch('/me/avatar', editAvatar);
router.use('/:userId', doesUserExist);
router.get('/:userId', getUserInfo);

module.exports = router;
