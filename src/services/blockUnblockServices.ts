import dotenv from "dotenv";

import * as checkCardValidations from "../services/utils/checkCardValidations.js"
import * as cardRepository from "../repositories/cardRepository.js";

dotenv.config();

// function checkPassword(password:string, cardPassword:string) : boolean{
//     const cryptr = new Cryptr(process.env.CRYPTR || "secret");
//     const decryptedSecurityCode: string = cryptr.decrypt(cardPassword);
    
//   if(decryptedSecurityCode === password) {
//     return true
//   }
//   return false
// }

export async function unblock(id:number, password: string) {
    const result = await cardRepository.findById(id);

    checkCardValidations.checkIfCardExist(result)
    checkCardValidations.checkExpirationDate(result.expirationDate)
    checkCardValidations.checkIfCardIsInactive(result.password) //verifica se está ativo antes de desbloquear ou desbloquear
    checkCardValidations.checkPassword(password, result.password)
    
    if(!result.isBlocked){
      throw { code: "Conflict", message: "Card already unblocked"}
    }

    const cardData: { isBlocked: boolean } = {
        isBlocked: false,
    };

    await cardRepository.update(id, cardData) 
  
}

export async function block(id:number, password: string) {
    const result = await cardRepository.findById(id);

    checkCardValidations.checkIfCardExist(result)
    checkCardValidations.checkExpirationDate(result.expirationDate)
    checkCardValidations.checkPassword(password, result.password)

    if(result.isBlocked){
        throw { code: "Conflict", message: "Card already blocked"}
    }

    const cardData: { isBlocked: boolean } = {
        isBlocked: true,
      };  
    await cardRepository.update(id, cardData) 
    
}