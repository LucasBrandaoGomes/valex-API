import { Request, Response } from "express";
import * as services from "../services/cardServices.js";

export async function InserNewCard(req: Request, res : Response) {
    const {employeeId, type} = res.locals.body;
    const {APIKey} = res.locals;

    await services.addNewCard(employeeId, type, APIKey);
    return res.sendStatus(200);
}
