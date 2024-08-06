const router = require('express').Router();
const deviceController = require('../controllers/deviceController');
const validationMiddleware = require('../middleware/ValidationMiddleware');
const {deviceSchema} = require('../validationSchemas/schemas');

router.post('/', validationMiddleware(deviceSchema), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;