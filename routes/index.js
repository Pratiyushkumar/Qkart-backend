const router = require('express').Router();
const userRouter = require('./users.routes.js');
const authRouter = require('./auth.route.js');

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;
