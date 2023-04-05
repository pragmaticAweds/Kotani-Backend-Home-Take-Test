import { Router } from "express";
import { doSignTransaction } from "./transaction.actions";

const transactionRouter = Router();

transactionRouter.post("/transactions", doSignTransaction);

export default transactionRouter;
