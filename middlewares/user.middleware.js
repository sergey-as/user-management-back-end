const {isValidObjectId} = require('mongoose');

const {
    messages,
    statusCodes,
} = require('../configs');
const {User} = require('../dataBase');
const {userValidator} = require('../validators');


module.exports = {
    isUserByIdPresent: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userById = await User.findById(user_id);

            if (!userById) {
                return next({
                    message: messages.USER_NOT_FOUND,
                    status: statusCodes.NOT_FOUND_404
                });
            }

            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNotPresent: async (req, res, next) => {
        try {
            const {username} = req.body;
            const userByUsername = await User.findOne({username}).lean();

            if (userByUsername) {
                return next({
                    message: messages.USER_ALREADY_EXISTS,
                    status: statusCodes.FORBIDDEN_403
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDataValid: (validatorName) => (req, res, next) => {
        try {
            const {error, value} = userValidator[validatorName].validate(req.body);

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const {user_id} = req.params;

            if (!isValidObjectId(user_id)) {
                return next({
                    message: messages.NOT_VALID_USER_ID,
                    status: statusCodes.BAD_REQUEST_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
