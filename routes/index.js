const router = require('express').Router();
const userRouter = require('./users.routes.js');
const authRouter = require('./auth.route.js');
const productRouter = require('./product.route.js');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
module.exports = router;
