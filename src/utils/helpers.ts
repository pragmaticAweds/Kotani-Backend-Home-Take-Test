import { Response, Request, NextFunction } from "express";
import Web3 from "web3";

export function handleResponse(
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: any
) {
  const responseObj = {
    message: message || "OK",
    data,
  };

  return res.status(statusCode).json(responseObj);
}

export interface CustomError extends Error {
  name: string;
  message: string;
  code?: number;
  errors?: {
    [key: string]: {
      message: string;
      path: string;
      value: string;
    };
  };
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.name) {
    case "CastError":
      return res.status(400).json({ error: "Invalid id format" });

    case "ValidationError":
      const errors = Object.values(err.errors || {}).map(
        (error: any) => error.message
      );
      return res.status(400).json({ errors });

    case "MongoError":
      console.log({ errcode: err.code });
      if (err.code === 11000) {
        return res.status(400).json({ error: "Duplicate key error" });
      } else {
        return res.status(500).json({ error: "Database error" });
      }

    case "MongooseError":
      return res.status(400).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });

    case "MongoServerError":
      return res.status(400).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });

    case "Error":
      return res.status(500).json({
        error: {
          name: `Unhandled ${err.name}`,
          message: err.message,
        },
      });

    default:
      console.log(`Unhandled error: ${err.name}`);
      console.log("error stack: ", err.message);
      res.status(500).json({ error: "internal server error" });
  }
  next(err);
};

export function validateEthAddress(address: string) {
  // Check if the address is a valid Ethereum address
  if (!Web3.utils.isAddress(address)) {
    return false;
  }

  // Check if the address is checksummed
  const checksummedAddress = Web3.utils.toChecksumAddress(address);
  if (checksummedAddress !== address) {
    return false;
  }

  return true;
}
