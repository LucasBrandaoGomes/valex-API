import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function cardTransactions(id:number) {
    const result = await cardRepository.findById(id);
    
    if (!result) {
      throw { code: "NotFound", message: "Invalid card"}
    }
    
    const payments = await paymentRepository.findByCardId(id)
    const recharges = await rechargeRepository.findByCardId(id)
    const balance = await calculateBalance(id)
    console.log(payments, recharges, balance)
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
