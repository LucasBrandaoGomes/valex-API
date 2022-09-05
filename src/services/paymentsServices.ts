import Cryptr from "cryptr";

import * as cardRepository from "../repositories/cardRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"
import * as businessesRepository from "../repositories/businessRepository.js"
import * as checkCardValidations from "../services/utils/checkCardValidations.js"

async function checkCompanyApiKey(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) {
      throw { code: "NotFound", message: "Invalid company, insert a valid API Key"}
    }
  
    return company;
}

function checkPassword(password:string, cardPassword:string) {
    const cryptr = new Cryptr(process.env.CRYPTR || "secret");
    const decryptedSecurityCode: string = cryptr.decrypt(cardPassword);
  if(decryptedSecurityCode !== password) {
    throw { code: "Unauthorized", message: "Invalid password"}
  }
}

async function checkBusiness(businessId: number, cardType: cardRepository.TransactionTypes){
    const business = await businessesRepository.findById(businessId)
    if (!business){
        throw { code: "NotFound", message: "Invalid businesses"}
    }

    if (business.type !== cardType){
        throw { code: "Unauthorized", message: `Card type does not match with busines type, please try ${business.type} card`}
    }
    
}

async function calculateBalance(cardId:number) {
    const payments = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargeRepository.findByCardId(cardId)
    const paymentsSum = getTransactionsSum(payments)
    const rechargeSum = getTransactionsSum(recharges)
    const balance = rechargeSum - paymentsSum
    return balance
}

function getTransactionsSum(transactions: any): number {
    return transactions.reduce(
      (sum: number, transaction: any) => sum + transaction.amount,
      0
    );
}

async function checkBalance(cardId: number, amount: number) {
    const balance = await calculateBalance(cardId)
    const finalBalance = balance - amount
    if(finalBalance <0){
        throw { code: "Unauthorized", message: "Sorry, this card have insufficient funds"}
    }
    
}

function checkIfCardIsBlocked(isBlocked: boolean){
  if(isBlocked === true){
    throw { code: "Unauthorized", message: "Card blocked, please unblock the card."}
  }
}

export async function newPayment(cardId: number, password: string, businessId: number, amount:number, apiKey: string, ) {
    const paymentData = { cardId, businessId, amount };
    const card = await cardRepository.findById(cardId);
    
    await checkCompanyApiKey(apiKey)
    
    checkCardValidations.checkIfCardExist(card)
    checkCardValidations.checkExpirationDate(card.expirationDate)
    checkCardValidations.checkIfCardIsInactive(card.password)
    checkIfCardIsBlocked(card.isBlocked)
    checkPassword(password, card.password)
    await checkBusiness(businessId, card.type)
    await checkBalance(cardId,amount)

    await paymentRepository.insert(paymentData)
}