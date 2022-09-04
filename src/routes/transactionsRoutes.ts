import { Router } from "express";

import * as controller from "../controllers/cardControllers.js";

const transactionsRouters = Router()

transactionsRouters.get('/transactions', controller.seeTransactions)

export default transactionsRouters;