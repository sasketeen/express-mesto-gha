const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const InternalServerError = require('../errors/InternalServerError');
const NotFound = require('../errors/NotFound');

/** получение массива всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new InternalServerError()));
};

/** создание нового пользователя */
module.exports.postUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      next(new InternalServerError());
    });
};

/** middleware проверки существования пользователя */
module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        next();
        return;
      }
      next(new NotFound('Пользователь по указанному id не найден'));
    })
    .catch(() => next(new BadRequest('Неверные параметры запроса')));
};

/** получение пользователя по id */
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() => next(new InternalServerError()));
};

/**  обновление информации о пользователе */
module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(new InternalServerError());
    });
};

/**  обновление аватара */
module.exports.editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch(() => next(new InternalServerError()));
};
