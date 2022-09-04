import { Router } from "express";

import * as schema from "../schemas/cardSchema.js";
import * as controller from "../controllers/cardControllers.js";
import checkCompanyAPIKey from "../middlewares/checkAPIKeyMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const cardRouters = Router()

cardRouters.post('/cards', checkCompanyAPIKey , validateSchemaMiddleware(schema.newCardSchema),controller.inserNewCard)
cardRouters.put('/cards', validateSchemaMiddleware(schema.cardActivateSchema), controller.activateCard)
cardRouters.put('/cards/block', validateSchemaMiddleware(schema.blockUnblockCardSchema), controller.blockCard)
cardRouters.put('/cards/unblock', validateSchemaMiddleware(schema.blockUnblockCardSchema), controller.unblockCard)

export default cardRouters;
