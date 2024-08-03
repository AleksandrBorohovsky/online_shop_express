const router = require('express').Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', brandController.create);
router.get('/', checkRole("ADMIN"), brandController.getAll);

module.exports = router;