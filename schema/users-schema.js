const Joi = require("joi");

const usersAddSchema = Joi.object({
    email: Joi.string().required().messages({
        "any.required": `missing required name field`,
      }),
    password: Joi.string().required().messages({
        "any.required": `missing required name field`,
    }),
})

module.exports = {usersAddSchema};

