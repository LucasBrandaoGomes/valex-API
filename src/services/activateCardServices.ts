import dotenv from "dotenv";
import Cryptr from "cryptr";

import * as cardRepository from "../repositories/cardRepository.js";

dotenv.config();

export async function checkRegisteredCard(id: number, securityCode: string) {
    const result = await cardRepository.findById(id);
    const cryptr = new Cryptr(process.env.CRYPTR || "secret");
    const decryptedSecurityCode: string = cryptr.decrypt(result.securityCode);
    
    if (!result) {
      throw { code: "NotFound", message: "Invalid card"}
    }
    if(result.password){
      throw { code: "Conflict", message: "Card already active"}
    }

    if(securityCode !== decryptedSecurityCode){
        throw { code: "Forbidden", message: "Invalid card"}
    }
}

function encryptPassword(password:string) {
    const cryptr = new Cryptr(process.env.CRYPTR);
    const passwordEncrypted = cryptr.encrypt(password);
    
    return passwordEncrypted
}
export async function ActiveCard(id: number, securityCode: string, password:string) {
  await checkRegisteredCard(id, securityCode);
  const passwordEncrypted = encryptPassword(password)
  const cardData: { password: string } = {
    password: passwordEncrypted,
  };  
  await cardRepository.update(id, cardData) 
}