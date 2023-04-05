import { NextFunction, Request, Response } from "express";
import { handleResponse, validateEthAddress } from "../../utils/helpers";
import Account from "./account.model";
import { getBalance } from "../../services/web3";

async function getAllAccount(_req: Request, res: Response, next: NextFunction) {
  try {
    const accounts = await Account.find({});
    return handleResponse(res, 200, "", accounts);
  } catch (err) {
    next(err);
  }
}

async function getAddressBalance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { address } = req.params;

  const isValidAddress = validateEthAddress(address);

  if (!isValidAddress)
    return handleResponse(res, 400, "Invalid Eth Address", { address });

  try {
    const balance = await getBalance(address.toString());
    return handleResponse(res, 200, "", { balance });
  } catch (err) {
    next(err);
  }
}

export { getAllAccount, getAddressBalance };
