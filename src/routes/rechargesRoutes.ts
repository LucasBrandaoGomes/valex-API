import { Router } from "express";
import { cardRecharges } from "../controllers/rechargesController.js";
import checkAmount from "../middlewares/checkAmount.js";
import checkCompanyAPIKey from "../middlewares/checkAPIKeyMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { newRechargeSchema } from "../schemas/paymentsAndRechargesSchemas.js";

const rechargesRouters = Router()

rechargesRouters.post('/recharges', checkCompanyAPIKey, validateSchemaMiddleware(newRechargeSchema), checkAmount, cardRecharges)

export default rechargesRouters;