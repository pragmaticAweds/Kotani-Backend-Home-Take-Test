import { Router } from "express";
import { getAddressBalance, getAllAccount } from "./account.actions";

const accountRouter = Router();

accountRouter
  .get("/accounts", getAllAccount)
  .get("/balance/:address", getAddressBalance);

export default accountRouter;
