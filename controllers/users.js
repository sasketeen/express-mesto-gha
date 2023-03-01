const User = require('../models/user');

/** получение массива всех пользователей */
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.send(err)); // ошибка сервера
};

/** создание нового пользователя */
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.send(err)); // ошибка сервера или валидации
};

/** middlewar проверки существования пользователя */
module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then(() => next())
    .catch((err) => res.send(err)); // неверные данные
};

/** получение пользователя по id */
module.exports.getUserInfo = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.send(err)); // ошибка сервера
};

/**  обновление ифнормации о пользователе */
module.exports.editUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.send(err)); // сервер или валидация
};

/**  обновление аватара */
module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.send(err)); // сервер
};
