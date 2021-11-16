const Joi = require('joi');

const {constants, userTypes} = require('../configs');

module.exports = {
    usernameValidator: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    nameValidator: Joi
        .string()
        .regex(constants.NAME_REGEXP)
        .min(2)
        .max(30)
        .trim(),
    emailValidator: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim(),
    passwordValidator: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .trim(),
    userTypeValidator: Joi
        .string()
        .valid(...Object.values(userTypes))
};
