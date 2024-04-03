const Joi = require('joi');

// Validate register
const registerValidation = (data) => {
    const schema = Joi.object(
        {
            firstName: Joi.string().min(2).max(100).required(),
            lastName: Joi.string().min(2).max(100).required(),
            email: Joi.string().min(6).max(100).required(),
            password: Joi.string().min(8).max(100).required(),
            role: Joi.string().max(100).required()
        }
    );
    return schema.validate(data);
}

// Validate login
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).max(100).required(),
            password: Joi.string().min(8).max(100).required()
        }
    );
    return schema.validate(data);
}

// Verify token

module.exports = {registerValidation, loginValidation};