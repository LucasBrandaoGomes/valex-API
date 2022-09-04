import { Request, Response, NextFunction } from "express";

export default async function checkCompanyApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"]

  if (!apiKey) {
    throw { code: "Unauthorized", message: "Missing API Key" };
  }

  res.locals.apiKey = apiKey;

  next();
}