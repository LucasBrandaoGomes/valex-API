import joi from "joi";

const newCardSchema = joi.object({
  employeeId: joi.number().integer().greater(0).required(),
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

export { newCardSchema };