import { Request, Response, NextFunction } from "express";

export default async function checkAmount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const amount: number = req.body.amount
  if (amount < 0 ) {
    throw { code: "Bad Request", message: "Invalid value, try another amount" };
  }

  res.locals.amount = req.body.amount;

  next();
}