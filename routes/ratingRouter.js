const router = require('express').Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/', authMiddleware, ratingController.setRating);
router.get('/:id', authMiddleware, ratingController.getRating);

module.exports = router;