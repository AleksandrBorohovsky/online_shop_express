const router = require('express').Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/', authMiddleware, basketController.addDevice);
router.get('/', authMiddleware, basketController.showBasket);

module.exports = router;