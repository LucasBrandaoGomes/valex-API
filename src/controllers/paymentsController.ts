import { Request, Response } from "express";
import { newPayment } from "../services/paymentsServices.js";

export async function cardPayments(req: Request, res: Response) {
    const { cardId, password, businessId } = res.locals.body
    const { amount, apiKey } = res.locals

    await newPayment(cardId, password, businessId, amount, apiKey)
    res.sendStatus(201)
}