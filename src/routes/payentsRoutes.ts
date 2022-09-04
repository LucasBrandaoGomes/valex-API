import { Router } from "express";
import { cardPayments } from "../controllers/paymentsController.js";
import checkAmount from "../middlewares/checkAmount.js";
import checkCompanyAPIKey from "../middlewares/checkAPIKeyMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { newPaymentSchema } from "../schemas/paymentsAndRechargesSchemas.js";

const paymentsRouters = Router()

paymentsRouters.post('/payments', checkCompanyAPIKey, validateSchemaMiddleware(newPaymentSchema),checkAmount, cardPayments)

export default paymentsRouters;