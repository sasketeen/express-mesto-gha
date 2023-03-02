const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const InternalServerError = require('../errors/InternalServerError');
const NotFound = require('../errors/NotFound');

/** получение карточек */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new InternalServerError()));
};

/** создание карточки */
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(new InternalServerError());
    });
};

/** middleware проверки существования карточки */
module.exports.doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(() => next())
    .catch(() => next(new NotFound('Карточка с указанным id не найдена')));
};

module.exports.doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(() => next())
    .catch(() => next(new NotFound('Карточка с указанным id не найдена')));
};

/** удаление карточки */
module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch(() => next(new InternalServerError()));
};

/** добавления лайка карточке */
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(() => next(new InternalServerError()));
};

/** удаления лайка у карточки */
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(() => next(new InternalServerError()));
};
