import { signTransaction } from "../../services/web3";
import { handleResponse, validateEthAddress } from "../../utils/helpers";
import { NextFunction, Request, Response } from "express";
import Account from "../accounts/account.model";
import Transaction from "./transaction.model";

async function doSignTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { from, to, value } = req.body;

  if (!validateEthAddress(from) || !validateEthAddress(to))
    return handleResponse(res, 400, "Bad request", "Invalid address");

  const newTxData = {
    from: from as string,
    to: to as string,
    value: value as string,
  };

  try {
    const isExistingAddress = await Account.findOne({ address: from });

    if (!isExistingAddress) {
      await new Account({ address: from }).save();
    }

    const txHash = await signTransaction(newTxData);

    await new Transaction({
      from,
      to,
      value,
      transactionHash: txHash,
    }).save();
    handleResponse(res, 201, "", {
      from,
      to,
      value,
      txHash,
    });
  } catch (error) {
    next(error);
  }
}

export { doSignTransaction };
