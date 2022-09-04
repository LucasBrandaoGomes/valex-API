import joi from "joi"

const newRechargeSchema = joi.object({
    cardId: joi.number().integer().positive().required(),
    amount: joi.number().integer().greater(0).required(),
})

const newPaymentSchema = joi.object({
    cardId: joi.number().integer().positive().required(),
    password: joi.string().length(4).pattern(/^[0-9]{4}$/).required(),
    businessId: joi.number().positive().required(),
    amount: joi.number().integer().greater(0).required(),
})

export { newRechargeSchema, newPaymentSchema }