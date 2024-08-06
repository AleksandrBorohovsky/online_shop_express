const router = require('express').Router();
const typeController = require('../controllers/typeController');
const validationMiddleware = require('../middleware/ValidationMiddleware');
const {typeSchema} = require('../validationSchemas/schemas');

router.post('/', validationMiddleware(typeSchema), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;