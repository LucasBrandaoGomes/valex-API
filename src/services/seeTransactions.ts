import dotenv from "dotenv";

import * as cardRepository from "../repositories/cardRepository.js";
import * as payentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
dotenv.config();

export async function cardTransactions(id:number) {
    const result = await cardRepository.findById(id);
    
    if (!result) {
      throw { code: "NotFound", message: "Invalid card"}
    }
    
    const payments = await payentRepository.findByCardId(id)
    const recharges = await rechargeRepository.findByCardId(id)
    console.log(payments, recharges)
}