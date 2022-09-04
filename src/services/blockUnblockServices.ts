import dotenv from "dotenv";
import Cryptr from "cryptr";

import * as cardRepository from "../repositories/cardRepository.js";

dotenv.config();

function checkPassword(password:string, cardPassword:string) : boolean{
    const cryptr = new Cryptr(process.env.CRYPTR || "secret");
    const decryptedSecurityCode: string = cryptr.decrypt(cardPassword);
    
  if(decryptedSecurityCode === password) {
    return true
  }
  return false
}

export async function unblock(id:number, password: string) {
    const result = await cardRepository.findById(id);

    if (!result) {
        throw { code: "NotFound", message: "Invalid card"}
    }  
    //verifica se o cartão ja foi ativado//
    if(!result.password){
        throw { code: "Unauthorized", message: "Card inactive, please activate your card"}
    }

    if(!result.isBlocked){
      throw { code: "Conflict", message: "Card already unblocked"}
    }

    const validPassword = checkPassword(password, result.password)
    if (!validPassword){
        throw { code: "Unauthorized", message: "Invalid password"}
    }    

    const cardData: { isBlocked: boolean } = {
        isBlocked: false,
    };

    await cardRepository.update(id, cardData) 
  
}

export async function block(id:number, password: string) {
    const result = await cardRepository.findById(id);

    if (!result) {
        throw { code: "NotFound", message: "Invalid card"}
    }

    //verifica se o cartão ja foi ativado//
    if(!result.password){
        throw { code: "Unauthorized", message: "Card inactive, please activate your card"}
    }

    if(result.isBlocked){
        throw { code: "Conflict", message: "Card already blocked"}
    }

    const validPassword = checkPassword(password, result.password)
    if (!validPassword){
        throw { code: "Unauthorized", message: "Invalid password"}
    }

    const cardData: { isBlocked: boolean } = {
        isBlocked: true,
      };  
    await cardRepository.update(id, cardData) 
    
}