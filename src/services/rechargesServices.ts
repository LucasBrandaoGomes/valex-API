import * as cardRepository from "../repositories/cardRepository.js"
import * as rechargesRepository from "../repositories/rechargeRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"
import * as checkCardValidations from "../services/utils/checkCardValidations.js"

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

    await checkCompanyApiKey(apiKey)
    checkCardValidations.checkIfCardExist(result)
    checkCardValidations.checkExpirationDate(result.expirationDate)
    checkCardValidations.checkIfCardIsInactive(result.password)

    await rechargesRepository.insert(rechargeData)
}