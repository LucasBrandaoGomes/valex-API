import joi, { string } from "joi";

const newCardSchema = joi.object({
  employeeId: joi.number().integer().greater(0).required(),
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

const cardActivateSchema = joi.object({
  id: joi.number().greater(0).required(),
  securityCode: joi.string().length(3).required(),
  password: joi
    .string()
    .pattern(/^[0-9]+$/, { name: "password" })
    .length(4)
    .required(),
});

const blockUnblockCardSchema = joi.object({
  id: joi.number().integer().greater(0).required(),
  password: joi.string().length(4).pattern(/^[0-9]{4}$/).required(),
});


export { newCardSchema, cardActivateSchema, blockUnblockCardSchema };