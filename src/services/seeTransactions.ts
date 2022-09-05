import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as checkCardValidations from "../services/utils/checkCardValidations.js"

export async function cardTransactions(id:number) {
    const result = await cardRepository.findById(id);
    
    checkCardValidations.checkIfCardExist(result)
    
    const payments = await paymentRepository.findByCardId(id)
    const recharges = await rechargeRepository.findByCardId(id)
    const balance = await calculateBalance(id)

    const objectSend = {
      balance,
      transactions: payments.map(payment => payment),
      recharges: recharges.map(recharge => recharge)
    }
    
    return objectSend
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
