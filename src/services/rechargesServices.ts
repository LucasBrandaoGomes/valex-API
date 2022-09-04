import * as cardRepository from "../repositories/cardRepository.js"
import * as rechargesRepository from "../repositories/rechargeRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"

async function checkCompanyApiKey(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) {
      throw { code: "NotFound", message: "Invalid company, insert a valid API Key"}
    }
  
    return company;
  }

export async function newRecharge(id: number, amount:number, apiKey: string) {
    const result = await cardRepository.findById(id);
    const rechargeData  = {cardId: id, amount}
    
    if (!result) {
      throw { code: "NotFound", message: "Invalid card"}
    }
    
    if(!result.password){
      throw { code: "Conflict", message: "Card inactive, please activate the card before recharge"}
    }
    
    await checkCompanyApiKey(apiKey)

    await rechargesRepository.insert(rechargeData)
}