import { Request, Response, NextFunction } from "express";

export default async function checkCompanyApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers

  if (!apiKey) {
    throw { code: "Unauthorized", message: "Invalid API key! Insert a valid API key" };
  }

  res.locals.apiKey = apiKey;

  next();
}