const router = require('express').Router();
const validate = require('../middlewares/validate.js');
const uservalidation = require('../validations/user.validation.js');
const userController = require('../controllers/users.controller.js');

const validateUser = validate(uservalidation.getUser);
router.use('/:userId', validateUser, userController.getUser);

module.exports = router;
