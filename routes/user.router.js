const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isDataValid('createUserValidator'),
    userMiddleware.isUserNotPresent,
    userController.createUser
);
router.get(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdPresent,
    userController.getUser
);
router.delete(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdPresent,
    userController.deleteUser
);
router.put(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isDataValid('updateUserValidator'),
    userMiddleware.isUserByIdPresent,
    userController.updateUser
);

module.exports = router;
