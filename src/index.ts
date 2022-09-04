import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import errorHandlingMiddleware from "./middlewares/errorHandlerMiddleware.js";
import cardRouters from "./routes/cardRoutes.js";
import transactionsRouters from "./routes/transactionsRoutes.js";

dotenv.config();

const app = express()

app.use(cors())
app.use(json())
app.use(cardRouters)
app.use(transactionsRouters)
app.use(errorHandlingMiddleware)

const PORT : number = Number(process.env.PORT)

app.listen(PORT,() => {console.log(`Server runing on port ${PORT}`)})