import dayjs from "dayjs";
import Cryptr from "cryptr";

export function checkIfCardExist(card: any ) {
    if (!card) {
      throw { code: "NotFound", message: "Invalid card"}
    }
}

export function checkExpirationDate(expirationDate: string): any {
    const today: string = dayjs(Date.now()).format("MM/YY");
    const splitedToday: string[] = today.split("/");
    const splitedExpirationDate: string[] = expirationDate.split("/");
  
    const monthDifference: number = Number(splitedExpirationDate[0]) - Number(splitedToday[0])
    const yearDifference: number = Number(splitedExpirationDate[1]) - Number(splitedToday[1])
  
    if (monthDifference < 0 && yearDifference <= 0) {
      throw { code: "Bad Request", message: "Card is expired" };
    } else if (yearDifference < 0) {
      throw { code: "Bad Request", message: "Card is expired" };
    }
}

export function checkSecurityCode(card: any, securityCode: string) {
    const cryptr = new Cryptr(process.env.CRYPTR || "secret");
    const decryptedSecurityCode: string = cryptr.decrypt(card.securityCode);

    //console.log(decryptedSecurityCode) para fim de testes, consulte o CVC pelo console
    if(securityCode !== decryptedSecurityCode){
        throw { code: "Forbidden", message: "Invalid card CVC"}
    }
}

export function checkIfCardIsInactive(cardPassword:any){
    if(cardPassword === null){
        throw { code: "Conflict", message: "Card inactive, please activate the card before recharge."}
    }
}

export function checkPassword(password:string, cardPassword:string) {
    const cryptr = new Cryptr(process.env.CRYPTR || "secret");
    const decryptedSecurityCode: string = cryptr.decrypt(cardPassword);
  if(decryptedSecurityCode !== password) {
    throw { code: "Unauthorized", message: "Invalid password"}
  }
}