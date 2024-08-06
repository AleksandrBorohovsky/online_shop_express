const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware');
const validationMiddleware = require('../middleware/ValidationMiddleware');
const {userSchema} = require('../validationSchemas/schemas');

router.post('/registration', validationMiddleware(userSchema), userController.registration);
router.post('/login', userController.login);
router.get('/',authMiddleware, userController.getAll)

module.exports = router;