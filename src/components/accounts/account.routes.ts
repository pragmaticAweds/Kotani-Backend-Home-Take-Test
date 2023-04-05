import { sanitizeInput } from "../../utils/helpers";
import { Router } from "express";
import { getAddressBalance, getAllAccount } from "./account.actions";

const accountRouter = Router();

accountRouter
  .get("/accounts", getAllAccount)
  .get("/balance/:address", sanitizeInput("params"), getAddressBalance);

export default accountRouter;
