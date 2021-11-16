const Joi = require('joi');

const commonValidators = require('./common.validators');

const createUserValidator = Joi.object({
    username: commonValidators.usernameValidator,
    first_name: commonValidators.nameValidator.required(),
    last_name: commonValidators.nameValidator.required(),
    email: commonValidators.emailValidator.required(),
    password: commonValidators.passwordValidator.required(),
    user_type: commonValidators.userTypeValidator.required()
});

const updateUserValidator = Joi.object({
    username: Joi.forbidden(),
    first_name: commonValidators.nameValidator,
    last_name: commonValidators.nameValidator,
    email: commonValidators.emailValidator,
    password: commonValidators.passwordValidator,
    user_type: commonValidators.userTypeValidator
});

module.exports = {
    createUserValidator,
    updateUserValidator
};
