import { Request, Response } from "express";
import { newRecharge } from "../services/rechargesServices.js";

export async function cardRecharges(req: Request, res: Response) {
    const { cardId } = res.locals.body
    const { amount, apiKey } = res.locals

    await newRecharge(cardId, amount, apiKey)
    res.sendStatus(201)
}