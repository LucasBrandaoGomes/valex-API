import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Cryptr from "cryptr";
import dayjs from "dayjs";

import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";

dotenv.config();

async function checkCompanyApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) {
    throw { code: "NotFound", message: "Invalid company, insert a valid API Key"}
  }

  return company;
}

async function checkEmployeeRegister(id: number) {
  const registeredEmployee = await employeeRepository.findById(id);

  if (!registeredEmployee) {
    throw { code: "NotFound", message: "Employee not found"}
  }

  return registeredEmployee;
}

async function checkNumberOfCardType(
  id: number,
  type: cardRepository.TransactionTypes
) {
  const result = await cardRepository.findByTypeAndEmployeeId(type, id);

  if (result) {
    throw { code: "Conflict", message: `The employee already registered ${type} card`}
     
  }
}

function formatName(name: string) {
    const arrName = name.split(" ");
    const formatNameArr = [];
    for (let i = 0; i < arrName.length; i++) {
      if (i === 0 || i === arrName.length - 1) {
        formatNameArr.push(arrName[i].toUpperCase());
        continue;
      }
  
      if (i !== 0 && i !== arrName.length - 1 && arrName[i].length >= 3) {
        formatNameArr.push(arrName[i][0].toUpperCase());
        continue;
      }
    }
  
    return formatNameArr.join(" ");
}

export async function addNewCard(employeeId: number,
  type: cardRepository.TransactionTypes,
  apiKey: string
) {
  await checkCompanyApiKey(apiKey);
  const employee = await checkEmployeeRegister(employeeId);
  await checkNumberOfCardType(employeeId, type);

  const cardNumber = faker.finance.creditCardNumber();
  const cardName = formatName(employee.fullName);

  const cryptr = new Cryptr(process.env.CRYPTR || "secret");
  const cardCVCCripter = cryptr.encrypt(faker.finance.creditCardCVV());

  const expirationDate = dayjs().add(5, "year").format("MM/YYYY");
  await cardRepository.insert({
    employeeId,
    number: cardNumber,
    cardholderName: cardName,
    securityCode: cardCVCCripter,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type,
  });
}
