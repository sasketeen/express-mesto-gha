const router = require('express').Router();
const {
  getCards, postCard, doesCardExist, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', postCard);
router.use('/:cardId', doesCardExist);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
