import { Router } from "express";

import * as schema from "../schemas/cardSchema.js";
import * as controller from "../controllers/cardControllers.js";
import checkCompanyAPIKey from "../middlewares/checkAPIKeyMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const cardRouters = Router()

cardRouters.post('/cards', checkCompanyAPIKey , validateSchemaMiddleware(schema.newCardSchema),controller.InserNewCard)

export default cardRouters;
