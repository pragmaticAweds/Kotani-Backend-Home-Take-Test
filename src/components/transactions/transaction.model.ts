import { ITransactionProps } from "@src/utils/types";
import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    from: {
      require: true,
      type: String,
    },
    to: {
      require: true,
      type: String,
    },
    value: {
      require: true,
      type: Number,
    },
    transactionHash: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ITransactionProps>("Transaction", transactionSchema);
