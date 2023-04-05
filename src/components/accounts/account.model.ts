import { IAcctProps } from "@src/utils/types";
import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  address: {
    type: String,
    require: true,
  },
});

export default model<IAcctProps>("Account", accountSchema);
