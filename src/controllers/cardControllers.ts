import { Request, Response } from "express";
import * as services from "../services/newCardServices.js";
import * as activateServices from "../services/activateCardServices.js"
import * as transactionsServices from "../services/seeTransactions.js"
import * as blockUnblockServices from "../services/blockUnblockServices.js"

export async function inserNewCard(req: Request, res : Response) {

    const { employeeId, type } = res.locals.body;
    const { apiKey } = res.locals;
    await services.addNewCard(employeeId, type, apiKey);
    return res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { id, securityCode, password } = res.locals.body
    await activateServices.activeCard(id, securityCode, password);
    return res.sendStatus(200)
}

export async function seeTransactions(req: Request, res: Response) {
    const {id} = req.body
    const objecSend = await transactionsServices.cardTransactions(id)
    return res.status(200).send(objecSend)

}

export async function blockCard(req: Request, res: Response) {
    const { id, password } = res.locals.body
    await blockUnblockServices.block(id, password)
    return res.sendStatus(200)
}

export async function unblockCard(req: Request, res: Response) {
    const { id, password } = res.locals.body
    await blockUnblockServices.unblock(id, password)
    return res.sendStatus(200)
}