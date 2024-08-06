const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12).required(),
    role: Joi.string().default('USER')
})

const deviceSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    rating: Joi.number().default(0),
    img: Joi.string().required()
})

const brandSchema = Joi.object({
    name: Joi.string().required
})

const typeSchema = Joi.object({
    name: Joi.string().required
})

module.exports = {
    userSchema,
    deviceSchema,
    brandSchema,
    typeSchema
}

