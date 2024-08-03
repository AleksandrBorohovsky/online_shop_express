const router = require('express').Router();
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const typeRouter = require('./typeRouter');
const ratingRouter = require('./ratingRouter');
const basketRouter = require('./basketRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/rating', ratingRouter);
router.use('/basket', basketRouter);

module.exports = router;