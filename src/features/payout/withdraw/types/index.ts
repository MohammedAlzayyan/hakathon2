import { type } from "os";
import type { FC } from "react";
import type { APIResponseType, Children } from "types";

// type WithdrawalType= "bank" | "cash"
// type WithdrawalStatus= "Pending" | "Paid"

export type WithdrawalResponseData = {
    _id: string;
    hashCode: string;
    amount:number;
    accountName: string;
    accountNumber:string;
    bankBranch:string;
    bankName:string;
    action:string;
    typeWithdraw:string;
    createdBy:string;
    status: string;
    createdAt: string;
    updatedAt: string;
    
  };
  
export type WithdrawalResponse = APIResponseType<WithdrawalResponseData>;
