import { Request, Response } from "express";
import * as services from "../services/newCardServices.js";
import * as activateServices from "../services/activateCardServices.js"
import * as transactionsServices from "../services/seeTransactions.js"

export async function inserNewCard(req: Request, res : Response) {

    const { employeeId, type } = res.locals.body;
    const { apiKey } = res.locals;
    await services.addNewCard(employeeId, type, apiKey);
    return res.sendStatus(200);
}

export async function activateCard(req: Request, res: Response) {
    const { id, securityCode, password } = res.locals.body
    await activateServices.ActiveCard(id, securityCode, password);
    return res.sendStatus(200)
}

export async function seeTransactions(req: Request, res: Response) {
    const {id} = req.body
    await transactionsServices.cardTransactions(id)
    return res.sendStatus(200)

}