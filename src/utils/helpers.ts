import { Response, Request, NextFunction } from "express";
import { ParsedQs } from "qs";
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
          name: err.name,
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

function sanitizeInputFields<
  T extends { [key: string]: string | number | undefined }
>(obj: T | ParsedQs): T {
  // Create an empty object with the same type as the input object
  const sanitizedObj = {} as T;

  // Iterate over each key in the input object
  for (const key in obj) {
    const value = obj[key];
    // If the value is a string, sanitize it and assign it to the sanitized object

    // If the value is an image, assign it to the sanitized object without modifying it
    if (typeof value === "string" && key.includes("image")) {
      sanitizedObj[key as keyof T] = value as T[typeof key];
      // If the value is a number, assign it to the sanitized object without modifying it
    } else if (typeof value === "number") {
      sanitizedObj[key as keyof T] = value as T[typeof key];
      // The 'as T[typeof key]' part of this line is a type assertion that tells TypeScript that the type of the value is the same as the type of the property.
    } else if (typeof value === "string" && key !== "image") {
      // The following line sanitizes the string by removing all characters that are not numbers, letters, underscores, or dash
      sanitizedObj[key as keyof T] = value.replace(
        /[^0-9a-zA-Z _-]/g,
        ""
      ) as T[typeof key];
      // The 'as T[typeof key]' part of this line is a type assertion that tells TypeScript that the type of the sanitized value is the same as the type of the property.
    } else {
      // If the value is of an unsupported type, throw an error
      throw new Error(`Unsupported value type: ${value}`);
    }
  }
  // Return the sanitized object
  return sanitizedObj;
}

export function sanitizeInput(source: "body" | "params" | "query") {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      switch (source) {
        case "body":
          req.body = sanitizeInputFields(req.body);
          break;
        case "params":
          req.params = sanitizeInputFields(req.params);
          break;
        case "query":
          req.query = sanitizeInputFields(req.query as ParsedQs) as ParsedQs;
          break;
        default:
          throw new Error(`Unsupported input source: ${source}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
