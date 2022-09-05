import dotenv from "dotenv";
import Cryptr from "cryptr";

import * as checkCardValidations from "../services/utils/checkCardValidations.js"
import * as cardRepository from "../repositories/cardRepository.js";

dotenv.config();

function checkIfCardIsActive(card: any){
  if(card.password && card.password !== null){
      throw { code: "Conflict", message: "Card already active"}
  }
}

function encryptPassword(password:string) {
    const cryptr = new Cryptr(process.env.CRYPTR);
    const passwordEncrypted = cryptr.encrypt(password);
    
    return passwordEncrypted
}
export async function activeCard(id: number, securityCode: string, password:string) {
  const result = await cardRepository.findById(id);

  checkCardValidations.checkIfCardExist(result)
  checkCardValidations.checkExpirationDate(result.expirationDate)
  checkIfCardIsActive(result)
  checkCardValidations.checkSecurityCode(result, securityCode);

  const passwordEncrypted = encryptPassword(password)
  const cardData: { password: string } = {
    password: passwordEncrypted,
  };

  await cardRepository.update(id, cardData) 
}