const router = require('express').Router();
const userRouter = require('./users.routes.js');

router.use('/users', userRouter);

module.exports = router;
