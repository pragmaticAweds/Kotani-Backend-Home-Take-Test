import { Document } from "mongoose";

export interface ITransactionProps extends Document {
  from: string;
  to: string;
  value: string;
  transactionHash: string;
}

export interface IAcctProps extends Document {
  address: string;
  name: string;
  email: string;
}

export interface SendTxParams {
  from: string;
  to: string;
  value: string | number;
  gas?: number;
  gasPrice?: string;
}
