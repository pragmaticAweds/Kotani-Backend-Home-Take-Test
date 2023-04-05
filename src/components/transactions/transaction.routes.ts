import { sanitizeInput } from "../../utils/helpers";
import { Router } from "express";
import { doSignTransaction } from "./transaction.actions";

const transactionRouter = Router();

transactionRouter.post(
  "/transactions",
  sanitizeInput("body"),
  doSignTransaction
);

export default transactionRouter;
