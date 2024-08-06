const router = require('express').Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/CheckRoleMiddleware');
const validationMiddleware = require('../middleware/ValidationMiddleware');
const {brandSchema} = require('../validationSchemas/schemas');

router.post('/', validationMiddleware(brandSchema), brandController.create);
router.get('/', checkRole("ADMIN"), brandController.getAll);

module.exports = router;