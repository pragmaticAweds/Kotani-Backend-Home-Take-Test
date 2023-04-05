import { Router } from "express";
import accountRouter from "./accounts/account.routes";
import transactionRouter from "./transactions/transaction.routes";

const componentRouter = Router();

componentRouter.use("/", accountRouter, transactionRouter);

export default componentRouter;
