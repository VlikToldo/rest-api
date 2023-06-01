const Joi = require("joi");

const contactsAddSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `missing required name field`,
    }),
    email: Joi.string().required().messages({
      "any.required": `missing required name field`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `missing required name field`,
    }),
  });

const contactUpdateStatus = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite"
  }),
})

  module.exports = {
    contactsAddSchema,
    contactUpdateStatus
  };
