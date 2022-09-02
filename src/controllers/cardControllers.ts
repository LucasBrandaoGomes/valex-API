import { Request, Response } from "express";
import * as services from "../services/cardServices.js";

export async function InserNewCard(req: Request, res : Response) {

    const {employeeId, type} = res.locals.body;
    const { apiKey} = res.locals;
    await services.addNewCard(employeeId, type, apiKey);
    return res.sendStatus(200);
}
